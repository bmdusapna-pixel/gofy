import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const Payment = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const hasStartedPaymentRef = useRef(false);
  const zohoInstanceRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  // Cleanup functions
  const cleanupZohoContainer = useCallback(() => {
    const container = document.getElementById('zoho-payments-container');
    if (container && document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }, []);

  const cleanupZohoScript = useCallback(() => {
    const existingScript = document.querySelector('script[src*="zpayments.js"]');
    if (existingScript) {
      existingScript.remove();
    }
  }, []);

  const cleanupPayment = useCallback(() => {
    if (zohoInstanceRef.current) {
      try {
        zohoInstanceRef.current.close?.();
      } catch (e) {}
      zohoInstanceRef.current = null;
    }
    cleanupZohoContainer();
    cleanupZohoScript();
  }, [cleanupZohoContainer, cleanupZohoScript]);

  const waitForZoho = (maxAttempts = 100) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const checkZoho = () => {
        attempts++;
        if (window.ZohoPayments) {
          resolve(window.ZohoPayments);
        } else if (attempts >= maxAttempts) {
          reject(new Error("ZohoPayments not available after timeout"));
        } else {
          setTimeout(checkZoho, 100);
        }
      };
      checkZoho();
    });
  };

  const handlePay = useCallback(async () => {
    if (hasStartedPaymentRef.current) return;
    hasStartedPaymentRef.current = true;

    setLoading(true);
    setError(null);
    setPaymentStatus("pending");

    try {
      // if (!user?.email) {
      //   throw new Error("User information not available. Please log in again.");
      // }

      // 1. Create payment session
      const res = await api.post("/user/payment/create-session", {
        orderId,
        amount: parseFloat(amount),
        // customer: {
        //   email: user.email,
        //   first_name: user.first_name || user.name?.split(' ')[0] || 'Customer',
        //   last_name: user.last_name || user.name?.split(' ').slice(1).join(' ') || '',
        //   phone: user.phone || ''
        // },
        purpose: `Order Payment - ${orderId}`,
        reference_number: orderId
      });

      const { paymentSessionId } = res.data;
      console.log("✅ Payment Session ID:", paymentSessionId);

      // 2. Cleanup existing
      cleanupPayment();

      // 3. Create container
      const container = document.createElement('div');
      container.id = 'zoho-payments-container';
      container.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
        z-index: 9999; background: rgba(0,0,0,0.5);
      `;
      document.body.appendChild(container);

      // 4. Load Zoho script with proper polling
      cleanupZohoScript();
      const script = document.createElement("script");
      script.src = "https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js";
      script.async = true;
      
      script.onload = async () => {
        console.log("✅ Zoho script loaded");
        try {
          // ✅ CRITICAL FIX: Poll for ZohoPayments availability
          const ZohoPayments = await waitForZoho();
          
          const zp = new ZohoPayments();
          zohoInstanceRef.current = zp;
          
          await zp.init({
            payment_session_id: paymentSessionId,
            container: 'zoho-payments-container'
          });

          // Event handlers
          zp.on("payment_success", async (data) => {
            console.log("✅ Payment Success:", data);
            cleanupPayment();
            setPaymentStatus("success");
            
            try {
              const verifyRes = await api.post("/user/payment/verify", {
                paymentSessionId,
                orderId
              });
              
              if (verifyRes.data.success) {
                setTimeout(() => {
                  navigate(`/order-confirmation?orderId=${orderId}`);
                }, 2000);
              }
            } catch (verifyErr) {
              console.error("Verification failed:", verifyErr);
              setError("Payment successful but verification failed.");
            }
          });

          zp.on("payment_failure", (data) => {
            console.error("❌ Payment failed:", data);
            cleanupPayment();
            setPaymentStatus("failed");
            setError("Payment failed. Please try again.");
          });

          zp.on("payment_cancel", () => {
            console.log("❌ Payment cancelled");
            cleanupPayment();
            setError("Payment cancelled. Please try again.");
          });

          zp.requestPayment({
            amount: parseFloat(amount),
            purpose: `Order Payment - ${orderId}`
          });

        } catch (initError) {
          console.error("Zoho init error:", initError);
          cleanupPayment();
          setError("Payment widget failed to initialize.");
        }
      };

      script.onerror = () => {
        cleanupPayment();
        setError("Failed to load payment gateway.");
      };

      document.head.appendChild(script);

    } catch (err) {
      console.error("Payment error:", err);
      cleanupPayment();
      const errorMsg = err.response?.data?.message || err.message || "Payment failed";
      setError(errorMsg);
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  }, [orderId, amount, user, navigate, cleanupPayment]);

  useEffect(() => {
    if (!orderId || !amount) {
      setError("Missing order information.");
      return;
    }
    handlePay();

    return () => {
      cleanupPayment();
      hasStartedPaymentRef.current = false;
    };
  }, []);

  if (!orderId || !amount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Payment Link</h2>
          <p className="text-gray-600 mb-6">Missing order information.</p>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-2 bg-[#00bbae] text-white rounded-lg hover:bg-[#f88e0f] transition-colors"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  if (error && paymentStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Redirecting to confirmation...</p>
          <Loader className="w-8 h-8 text-[#00bbae] animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment</h2>
        {amount && (
          <p className="text-xl text-gray-600 mb-6">Amount: ₹{parseFloat(amount).toFixed(2)}</p>
        )}
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 text-[#00bbae] animate-spin" />
            <p className="text-gray-600">Connecting to payment gateway...</p>
          </div>
        )}
        {error && paymentStatus !== "failed" && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">{error}</p>
            <button
              onClick={handlePay}
              className="mt-2 px-4 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
