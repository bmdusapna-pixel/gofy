import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import api from "../api/axios";

const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const orderId = params.get("orderId");

  useEffect(() => {
    // Close any lingering Zoho payment modals when this page loads
    const closeZohoModals = () => {
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

    // Close modals immediately when component mounts
    closeZohoModals();
    
    // Also try after a short delay in case modals are added dynamically
    const timeoutId = setTimeout(closeZohoModals, 100);

    const fetchOrder = async () => {
      if (!orderId) {
        setError("Missing order ID");
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get(`/user/order/${orderId}`);
        if (!data.success) {
          throw new Error(data.message || "Failed to load order");
        }
        setOrder(data.order);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error loading order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
          <Loader className="mx-auto animate-spin w-12 h-12 text-[#00bbae]" />
          <h2 className="mt-4 text-lg font-medium text-gray-800">
            Loading your order
          </h2>
          <p className="mt-2 text-gray-600">
            Please wait while we fetch your order details.
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
          <XCircle className="mx-auto text-red-500 w-16 h-16" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Unable to load order
          </h2>
          <p className="mt-2 text-gray-600">
            {error || "We could not find your order details."}
          </p>
          <button
            onClick={() => navigate("/account")}
            className="mt-6 w-full py-2.5 rounded-lg bg-[#00bbae] text-white font-medium hover:bg-[#009f94] transition"
          >
            Go to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <div className="flex items-center justify-center">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800">
          Order Confirmed
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Thank you for your purchase! Your order has been successfully placed.
        </p>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span>{order.orderId || order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{order.orderStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment Status:</span>
            <span>{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span>₹{order.pricing?.total?.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/account")}
          className="mt-6 w-full py-2.5 rounded-lg bg-[#00bbae] text-white font-medium hover:bg-[#009f94] transition"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

