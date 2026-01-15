import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios.js";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey  = import.meta.env.VITE_API_KEY;
console.log("apiKey", apiKey);

export const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'failed'
  const hasStartedPaymentRef = useRef(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!orderId || !amount) {
      setError("Missing order ID or amount. Please go back to checkout.");
      return;
    }

    // In React 18 StrictMode (dev), effects run twice. Guard to avoid double payment creation.
    if (hasStartedPaymentRef.current) return;
    hasStartedPaymentRef.current = true;

    // Initialize payment when component mounts
    handlePay();
  }, [orderId, amount]);

  const handlePay = async () => {
    if (!orderId || !amount) {
      setError("Missing order information");
      return;
    }

    setLoading(true);
    setError(null);
    setPaymentStatus("pending");

    try {
      // Step 1: Create payment session
      const res = await api.post("/user/payment/create-session", {
        orderId,
      });

      console.log("Payment session response:", res.data);

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to create payment session");
      }

      const { paymentSessionId, accountId, invoiceNumber, customer } = res.data;

      if (!paymentSessionId) {
        console.error("Payment session ID not found in response:", res.data);
        throw new Error("Payment session ID not received from server");
      }

      if (!accountId) {
        console.error("Account ID not found in response:", res.data);
        throw new Error("Account ID not received from server");
      }

      if (!apiKey) {
        console.error("API Key not found in response:", res.data);
        throw new Error("API Key not received from server. Please configure it in Zoho Payments settings.");
      }

      console.log("Payment session ID:", paymentSessionId);
      console.log("Account ID:", accountId);
      console.log("API Key:", apiKey ? "***" + apiKey.slice(-4) : "Not provided");
      console.log("Invoice Number:", invoiceNumber);
      console.log("Customer:", customer);

      // Step 2: Load Zoho Payments widget script
      // Check if script is already loaded
      if (window.ZohoPayments || window.ZPayments) {
        console.log("Zoho Payments script already loaded");
        initializeWidget(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
        return;
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="zoho"][src*="payment"]');
      if (existingScript) {
        console.log("Zoho Payments script tag already exists, waiting for it to load...");
        existingScript.onload = () => initializeWidget(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
        existingScript.onerror = () => {
          console.error("Existing script failed to load, trying alternative...");
          loadWidgetScript(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
        };
        // If script is already loaded, initialize immediately
        if (window.ZohoPayments || window.ZPayments) {
          initializeWidget(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
        }
        return;
      }

      loadWidgetScript(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
    } catch (err) {
      console.error("Payment error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to process payment. Please try again."
      );
      setLoading(false);
      setPaymentStatus("failed");
    }
  };

  const loadWidgetScript = (paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer) => {
    console.log("Loading Zoho Payments widget script...");
    
    // Use the new ZPayments API (the old one has CORS issues)
    const scriptUrls = [
      "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js",
    ];

    let currentUrlIndex = 0;

    const tryLoadScript = (urlIndex) => {
      if (urlIndex >= scriptUrls.length) {
        console.error("All script URLs failed to load");
        setError("Failed to load payment widget. Please check your internet connection and try again.");
        setLoading(false);
        setPaymentStatus("failed");
        return;
      }

      const script = document.createElement("script");
      script.src = scriptUrls[urlIndex];
      script.async = true;
      script.crossOrigin = "anonymous";

      console.log(`Attempting to load script from: ${scriptUrls[urlIndex]}`);

      // Set timeout for script loading (10 seconds)
      const timeout = setTimeout(() => {
        console.error(`Script loading timeout for: ${scriptUrls[urlIndex]}`);
        script.remove();
        // Try next URL
        tryLoadScript(urlIndex + 1);
      }, 10000);

      script.onload = () => {
        clearTimeout(timeout);
        console.log(`Script loaded successfully from: ${scriptUrls[urlIndex]}`);
        // Wait a bit for the script to initialize
        setTimeout(() => {
          initializeWidget(paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer);
        }, 100);
      };

      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error(`Script failed to load from: ${scriptUrls[urlIndex]}`, error);
        script.remove();
        // Try next URL
        tryLoadScript(urlIndex + 1);
      };

      document.head.appendChild(script);
    };

    tryLoadScript(0);
  };

  const initializeWidget = (paymentSessionId, accountId, apiKey, orderId, amount, invoiceNumber, customer) => {
    try {
      console.log("Initializing Zoho Payments widget...");
      console.log("Available window objects:", {
        ZohoPayments: typeof window.ZohoPayments,
        ZPayments: typeof window.ZPayments,
      });
      
      // Use the new ZPayments API
      let zp;
      let isNewAPI = false;
      if (typeof window.ZPayments !== "undefined") {
        console.log("Using ZPayments (new API)");
        isNewAPI = true;
        // Initialize with account_id, domain, and api_key as per documentation
        const config = {
          account_id: accountId,
          domain: "IN", // India domain for payments.zoho.in
          otherOptions: {
            api_key: apiKey,
          },
        };
        zp = new window.ZPayments(config);
        console.log("ZPayments instance created with config:", { ...config, otherOptions: { api_key: "***" + apiKey.slice(-4) } });
      } else if (typeof window.ZohoPayments !== "undefined") {
        console.log("Using ZohoPayments (old API) as fallback");
        zp = new window.ZohoPayments();
      } else {
        throw new Error("Zoho Payments widget failed to load - neither ZohoPayments nor ZPayments found");
      }

      console.log("Zoho Payments instance created:", zp);
      console.log("Available methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(zp)));
      
      // For new ZPayments API, use requestPaymentMethod instead of init
      if (isNewAPI) {
        // New API - use requestPaymentMethod
        console.log("Using requestPaymentMethod for new API");
        
        // Payment options as per Zoho Payments documentation
        const paymentOptions = {
          amount: parseFloat(amount).toString(),
          currency_code: "INR",
          payments_session_id: paymentSessionId,
          description: `Order Payment - Order #${orderId}`,
          currency_symbol: "₹",
          business: "Gofy",
          invoice_number: invoiceNumber || `INV-${orderId}`,
          address: {
            name: customer?.name || "Customer",
            email: customer?.email || "",
            phone: customer?.phone || "",
          },
        };

        console.log("Calling requestPaymentMethod with options:", paymentOptions);

        zp.requestPaymentMethod(paymentOptions)
          .then(async (data) => {
            console.log("Payment success:", data);
            setPaymentStatus("success");
            setLoading(false);

            // Verify payment with backend
            try {
              const verifyRes = await api.post("/user/payment/verify", {
                paymentSessionId,
                orderId,
              });

              if (verifyRes.data.success) {
                // Redirect to order confirmation or success page
                setTimeout(() => {
                  navigate(`/order-confirmation?orderId=${orderId}`);
                }, 2000);
              } else {
                setError("Payment verification failed. Please contact support.");
                setPaymentStatus("failed");
              }
            } catch (verifyError) {
              console.error("Payment verification error:", verifyError);
              setError("Payment verification failed. Please contact support.");
              setPaymentStatus("failed");
            }
          })
          .catch((err) => {
            if (err.code !== 'widget_closed') {
              console.error("Payment error:", err);
              setPaymentStatus("failed");
              setLoading(false);
              setError("Payment failed. Please try again.");
            } else {
              console.log("Widget was closed by user");
              setPaymentStatus("failed");
              setLoading(false);
              setError("Payment was cancelled.");
            }
          })
          .finally(() => {
            // Close the widget instance
            if (typeof zp.close === "function") {
              zp.close();
            }
          });

        return; // Exit early for new API
      }

      // Old API - use init and event handlers
      // Set up event handlers BEFORE initialization
      // Handle payment success
      zp.on("payment_success", async (data) => {
        console.log("Payment success event received:", data);
        setPaymentStatus("success");
        setLoading(false);

        // Verify payment with backend
        try {
          const verifyRes = await api.post("/user/payment/verify", {
            paymentSessionId,
            orderId,
          });

          if (verifyRes.data.success) {
            // Redirect to order confirmation or success page
            setTimeout(() => {
              navigate(`/order-confirmation?orderId=${orderId}`);
            }, 2000);
          } else {
            setError("Payment verification failed. Please contact support.");
            setPaymentStatus("failed");
          }
        } catch (verifyError) {
          console.error("Payment verification error:", verifyError);
          setError("Payment verification failed. Please contact support.");
          setPaymentStatus("failed");
        }
      });

      // Handle payment failure
      zp.on("payment_failure", (data) => {
        console.error("Payment failure event received:", data);
        setPaymentStatus("failed");
        setLoading(false);
        setError("Payment failed. Please try again.");
      });

      // Handle payment cancellation
      zp.on("payment_cancelled", (data) => {
        console.log("Payment cancelled event received:", data);
        setPaymentStatus("failed");
        setLoading(false);
        setError("Payment was cancelled.");
      });

      console.log("Event handlers registered, initializing widget with payment_session_id:", paymentSessionId);
      
      // Initialize with payment session ID - this should automatically open the widget
      zp.init({
        payment_session_id: paymentSessionId,
      });

      console.log("Widget initialized, checking if it opened...");

      // Some versions might need explicit opening, but init() usually opens it automatically
      // Check after a short delay if widget opened
      setTimeout(() => {
        console.log("Checking widget state after initialization...");
        // The widget should be visible now if init() worked
      }, 1000);
    } catch (initError) {
      console.error("Error initializing Zoho Payments:", initError);
      console.error("Error stack:", initError.stack);
      setError("Failed to initialize payment. Please try again.");
      setLoading(false);
      setPaymentStatus("failed");
    }
  };

  if (error && paymentStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-2 bg-[#00bbae] text-white rounded-lg hover:bg-[#f88e0f] transition-colors"
            >
              Back to Checkout
            </button>
            <button
              onClick={handlePay}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. Redirecting...
          </p>
          <Loader className="w-8 h-8 text-[#00bbae] animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Processing Payment
        </h2>
        {amount && (
          <p className="text-xl text-gray-600 mb-6">
            Amount: ₹{parseFloat(amount).toFixed(2)}
          </p>
        )}
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 text-[#00bbae] animate-spin" />
            <p className="text-gray-600">
              Please wait while we redirect you to the payment gateway...
            </p>
          </div>
        )}
        {error && paymentStatus !== "failed" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
