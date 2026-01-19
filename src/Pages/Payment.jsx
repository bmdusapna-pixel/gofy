import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";

const apiKey = import.meta.env.VITE_API_KEY;

const Payment = () => {
  const [status, setStatus] = useState("loading"); // loading | processing | success | failed
  const [error, setError] = useState(null);
  const hasStarted = useRef(false);
  const timersRef = useRef([]);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const orderId = params.get("orderId");
  const amount = params.get("amount");

  useEffect(() => {
    if (!orderId || !amount || hasStarted.current) return;
    hasStarted.current = true;
    startPayment();
  }, [orderId, amount]);

  useEffect(() => {
    return () => {
      // cleanup any pending timers
      for (const t of timersRef.current) clearTimeout(t);
      timersRef.current = [];
    };
  }, []);

  const startPayment = async () => {
    try {
      const { data } = await api.post("/user/payment/create-session", {
        orderId,
      });
      console.log("data",data)

      if (!data.success) throw new Error(data.message);

      loadScript(() => openWidget(data));
    } catch (err) {
      setError(err.message || "Payment failed");
      setStatus("failed");
    }
  };

  const loadScript = (cb) => {
    if (window.ZPayments) return cb();

    const script = document.createElement("script");
    script.src = "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js";
    script.onload = cb;
    script.onerror = () => {
      setError("Failed to load payment widget");
      setStatus("failed");
    };
    document.body.appendChild(script);
  };

  const closeZohoModal = () => {
    // Close any Zoho payment modals/overlays
    try {
      // Remove Zoho modal overlays
      const zohoModals = document.querySelectorAll(
        '[class*="zoho"], [id*="zoho"], [class*="zpay"], [id*="zpay"], .zoho-modal, .zpay-modal'
      );
      zohoModals.forEach((el) => {
        if (el.style) el.style.display = "none";
        el.remove?.();
      });

      // Remove any overlay backdrops
      const overlays = document.querySelectorAll(
        '.modal-backdrop, [class*="overlay"], [class*="backdrop"]'
      );
      overlays.forEach((el) => {
        if (el.style) el.style.display = "none";
        el.remove?.();
      });

      // Remove body classes that might lock scrolling
      document.body.classList.remove("modal-open", "zoho-open", "zpay-open");
      document.body.style.overflow = "";
    } catch (err) {
      console.warn("Error closing Zoho modal:", err);
    }
  };

  const redirectAfterSuccess = () => {
    const t = setTimeout(() => {
      // Close Zoho modal first
      closeZohoModal();
      
      // Use window.location.replace for hard redirect (clears modals, replaces history)
      window.location.replace(`/order-confirmation?orderId=${orderId}`);
    }, 500); // Short delay to ensure modal closes
    timersRef.current.push(t);
  };

  // This is the main flow you want: verify -> update status + create invoice -> redirect
  const verifyAndRedirect = async (paymentId) => {
    setStatus("processing");

    // Retry a few times because Zoho can take a moment to mark the payment as paid
    const maxAttempts = 8; // ~20 seconds total
    const intervalMs = 2500;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const { data } = await api.post("/user/payment/verify", {
          paymentId,
          orderId,
        });

        if (data?.success && data?.paymentStatus === "PAID") {
          setStatus("success");
          redirectAfterSuccess();
          return;
        }

        if (data?.paymentStatus === "FAILED") {
          setError(data?.message || "Payment failed or cancelled");
          setStatus("failed");
          return;
        }
      } catch (err) {
        // If API errors transiently, we'll retry
        if (attempt === maxAttempts) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Error verifying payment"
          );
          setStatus("failed");
          return;
        }
      }

      // wait before retry
      const t = setTimeout(() => {}, intervalMs);
      timersRef.current.push(t);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => {
        const tt = setTimeout(r, intervalMs);
        timersRef.current.push(tt);
      });
    }

    setError("Payment verification is taking longer than expected. Please check your orders.");
    setStatus("failed");
  };

  // Fallback only when paymentId isn't available from widget response
  const pollOrderStatusAndRedirect = async (maxAttempts = 20, interval = 2000) => {
    let attempts = 0;

    const checkOnce = async () => {
      const { data } = await api.get(`/user/order/${orderId}`);
      if (!data?.success || !data?.order) return null;
      return data.order?.paymentStatus;
    };

    const loop = async () => {
      try {
        const ps = await checkOnce();
        if (ps === "PAID") {
          setStatus("success");
          redirectAfterSuccess();
          return;
        }
        if (ps === "FAILED") {
          setError("Payment failed or was cancelled");
          setStatus("failed");
          return;
        }
      } catch {
        // ignore and continue retrying
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setError("Unable to confirm payment. Please check your orders.");
        setStatus("failed");
        return;
      }

      const tt = setTimeout(loop, interval);
      timersRef.current.push(tt);
    };

    setStatus("processing");
    loop();
  };

  const openWidget = async ({
    paymentSessionId,
    accountId,
    reference_number,
    invoiceNumber,
    customer,
  }) => {
    try {
      const zp = new window.ZPayments({
        account_id: accountId,
        domain: "IN",
        otherOptions: { api_key: apiKey },
      });
  
      // Open the widget and wait for payment completion
      const res = await zp.requestPaymentMethod({
        amount: amount,
        currency_code: "INR",
        payments_session_id: paymentSessionId,
        invoice_number: invoiceNumber,
        reference_number: reference_number,
        description: `Order #${orderId}`,
        address: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      });
      
      console.log("Zoho widget response:", res);
      
      // Try to extract payment ID from widget response
      const paymentId =
        res?.payment_id ||
        res?.paymentId ||
        res?.payment_id?.toString?.() ||
        res?.payment?.payment_id ||
        res?.payment?.id ||
        res?.data?.payment_id ||
        res?.data?.paymentId ||
        res?.data?.payment?.payment_id ||
        res?.data?.payment?.id;

      if (paymentId) {
        console.log("Payment ID found:", paymentId);
        await verifyAndRedirect(paymentId);
      } else {
        console.log("No payment ID in response, checking order status...");
        await pollOrderStatusAndRedirect();
      }
      
    } catch (err) {
      console.error("Widget error:", err);
      // Widget error might mean user cancelled or payment failed
      // Check order status once before showing error
      setStatus("processing");
      setTimeout(async () => {
        try {
          const { data } = await api.get(`/user/order/${orderId}`);
          if (data.success && data.order?.paymentStatus === "PAID") {
            setStatus("success");
            redirectAfterSuccess();
          } else {
            setError(err.message || "Payment cancelled or failed");
            setStatus("failed");
          }
        } catch {
          setError(err.message || "Payment cancelled or failed");
          setStatus("failed");
        }
      }, 2000);
    }
  };
  

/* ---------------- UI ---------------- */

if (status === "processing") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
        <Loader className="mx-auto animate-spin w-12 h-12 text-[#00bbae]" />
        <h2 className="mt-4 text-lg font-medium text-gray-800">
          Verifying Payment
        </h2>
        <p className="mt-2 text-gray-600">
          Your payment was completed. We&apos;re confirming it with our
          servers…
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Please do not refresh or close this page
        </p>
      </div>
    </div>
  );
}

if (status === "success") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Payment Successful
        </h2>
        <p className="mt-2 text-gray-600">
          Your payment has been received.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Redirecting to order confirmation…
        </p>
      </div>
    </div>
  );
}

if (status === "failed") {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
        <XCircle className="mx-auto text-red-500 w-16 h-16" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Payment Failed
        </h2>
        <p className="mt-2 text-gray-600">
          {error || "Something went wrong while processing your payment."}
        </p>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full py-2.5 rounded-lg bg-[#00bbae] text-white font-medium hover:bg-[#009f94] transition"
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
      <Loader className="mx-auto animate-spin w-12 h-12 text-[#00bbae]" />
      <h2 className="mt-4 text-lg font-medium text-gray-800">
        Processing Payment
      </h2>
      <p className="mt-2 text-gray-600">
        Redirecting you to the secure payment gateway…
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Please do not refresh or close this page
      </p>
    </div>
  </div>
);

};

export default Payment;
