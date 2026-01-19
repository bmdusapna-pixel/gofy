import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";

const apiKey = import.meta.env.VITE_API_KEY;

const Payment = () => {
  const [status, setStatus] = useState("loading"); // loading | success | failed
  const [error, setError] = useState(null);
  const hasStarted = useRef(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const orderId = params.get("orderId");
  const amount = params.get("amount");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!orderId || !amount || hasStarted.current) return;
    hasStarted.current = true;
    startPayment();
  }, [orderId, amount]);

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
  const openWidget = async ({ paymentSessionId, accountId,reference_number,invoiceNumber,customer }) => {
    try {
      const zp = new window.ZPayments({
        account_id: accountId,
        domain: "IN",
        otherOptions: { api_key: apiKey },
      });
  
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
      console.log("response",res)
      // 🔐 VERIFY PAYMENT ON BACKEND
      const verify = await api.post("/user/payment/verify", {
        paymentId: res?.payment_id,
        orderId,
      });
  
      if (!verify.data.success) {
        throw new Error("Payment verification failed");
      }
  
      setStatus("success");
      setTimeout(() => {
        navigate(`/order-confirmation?orderId=${orderId}`);
      }, 1500);
    } catch (err) {
      setError(err.message || "Payment cancelled or failed");
      setStatus("failed");
    }
  };
  

/* ---------------- UI ---------------- */

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
