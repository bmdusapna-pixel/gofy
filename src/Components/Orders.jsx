import React, { useEffect, useState } from "react";
import SubmitReview from "./SubmitReview.jsx";
import Invoice from "./Invoice.jsx";
import IssueForm from "./IssueForm.jsx";
import { ShoppingBag, Download, LogOut, Eye, ArrowLeft, Package, MapPin, CreditCard, Receipt, FileText, Loader2 } from "lucide-react";
import api from "../api/axios.js";
import { VITE_BASE_URL } from "../config.js";


const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailedOrder, setDetailedOrder] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [isIssue, setIsissue] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTime, setSelectedTime] = useState("all");
  const [orders,setorders] = useState([]);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [orderDetailsError, setOrderDetailsError] = useState(null);
  const [invoiceError, setInvoiceError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const orders = [
  //   {
  //     id: 1001,
  //     date: "19 Aug, 2025",
  //     status: "Delivered",
  //     total: 1499.0,
  //     discount: 50.0,
  //     couponDiscount: 20.0,
  //     deliveryCharges: 40.0,
  //     items: 1,
  //     details: {
  //       product: "Remote Control Car - Red",
  //       customColor: "Red (Default) - Free",
  //       accessories: "Rechargeable Battery Pack - (₹299.00)",
  //       warranty: "6-Month Warranty - (₹249.00)",
  //       paymentMethod: "UPI",
  //     },
  //     statusDates: {
  //       Processing: "19 Aug",
  //     },
  //   },
  //   {
  //     id: 1002,
  //     date: "18 Aug, 2025",
  //     status: "Shipped",
  //     total: 899.0,
  //     discount: 25.0,
  //     couponDiscount: 10.0,
  //     deliveryCharges: 40.0,
  //     items: 2,
  //     details: {
  //       product: "Building Blocks Set (100 pcs) x 2",
  //       customColor: "Multicolor - Free",
  //       accessories: "Storage Box - (₹149.00)",
  //       warranty: "1-Year Warranty - (₹199.00)",
  //       paymentMethod: "Cash on Delivery",
  //     },
  //     statusDates: {
  //       Processing: "18 Aug",
  //       Shipped: "19 Aug",
  //     },
  //   },
  //   {
  //     id: 1003,
  //     date: "17 Aug, 2025",
  //     status: "Delivered",
  //     total: 2199.0,
  //     discount: 100.0,
  //     couponDiscount: 50.0,
  //     deliveryCharges: 0.0,
  //     items: 1,
  //     details: {
  //       product: "Talking Teddy Bear (Large)",
  //       customColor: "Brown - Free",
  //       accessories: "Gift Wrap - (₹49.00)",
  //       warranty: "2-Year Warranty - (₹349.00)",
  //       paymentMethod: "NetBanking",
  //     },
  //     statusDates: {
  //       Processing: "17 Aug",
  //       Shipped: "18 Aug",
  //       Delivered: "20 Aug",
  //     },
  //   },
  //   {
  //     id: 1004,
  //     date: "16 Aug, 2025",
  //     status: "Processing",
  //     total: 1299.0,
  //     discount: 75.0,
  //     couponDiscount: 25.0,
  //     deliveryCharges: 40.0,
  //     items: 3,
  //     details: {
  //       product: "Cricket Kit for Kids (Bat, Ball, Stumps) x 3",
  //       customColor: "Blue Grip - Free",
  //       accessories: "Extra Tennis Ball - (₹99.00)",
  //       warranty: "6-Month Warranty - (₹199.00)",
  //       paymentMethod: "Credit Card",
  //     },
  //     statusDates: {
  //       Processing: "16 Aug",
  //     },
  //   },
  //   {
  //     id: 1005,
  //     date: "15 Aug, 2025",
  //     status: "Cancelled",
  //     total: 749.0,
  //     discount: 0.0,
  //     couponDiscount: 0.0,
  //     deliveryCharges: 40.0,
  //     items: 1,
  //     details: {
  //       product: "Puzzle Game - India Map",
  //       customColor: "Multicolor Print - Free",
  //       accessories: "Magnetic Board - (₹199.00)",
  //       warranty: "1-Year Warranty - (₹149.00)",
  //       paymentMethod: "Debit Card",
  //     },
  //   },
  //   {
  //     id: 1006,
  //     date: "14 Aug, 2025",
  //     status: "Refunded",
  //     total: 399.0,
  //     discount: 0.0,
  //     couponDiscount: 0.0,
  //     deliveryCharges: 40.0,
  //     items: 1,
  //     details: {
  //       product: "Kids Art Set",
  //       customColor: "N/A",
  //       accessories: "Case - (₹99.00)",
  //       warranty: "6-Month Warranty - (₹99.00)",
  //       paymentMethod: "NetBanking",
  //     },
  //   },
  // ];

  const usertoken = localStorage.getItem("token");

  const fetchMyOrders = async() => {
    try {
      setLoading(true);
      const response = await api.get(`/order/myOrders`);
      if(response.data.success)
      {
        setorders(response.data.data)
      }
    } 
    catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const fetchDetailedOrder = async (orderId) => {
    setLoadingOrderDetails(true);
    setOrderDetailsError(null);
    try {
      const response = await api.get(`/order/${orderId}`);
      console.log("response",response.data)
      if (response.data.success) {
        setDetailedOrder(response.data.order);
      } else {
        setOrderDetailsError(response.data.message || "Failed to load order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setOrderDetailsError(error.response?.data?.message || "Failed to load order details");
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  const fetchInvoiceData = async (orderId) => {
    setLoadingInvoice(true);
    setInvoiceError(null);
    try {
      const response = await api.get(`/invoice/order/${orderId}`);
      if (response.data.success) {
        setInvoiceData(response.data.invoice);
      } else {
        setInvoiceError(response.data.message || "Invoice not available");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setInvoiceError(error.response?.data?.message || "Invoice not available");
    } finally {
      setLoadingInvoice(false);
    }
  };
  
useEffect(()=>{
  fetchMyOrders();
},[])


  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(false);
    setShowIssueModal(false);
    setDetailedOrder(null);
    setInvoiceData(null);
    setOrderDetailsError(null);
    setInvoiceError(null);
    // Fetch detailed order and invoice data
    if (order._id) {
      fetchDetailedOrder(order._id);
      fetchInvoiceData(order._id);
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "CONFIRMED":
        return 25;
      case "SHIPPED":
        return 50;
      case "DELIVERED":
      case "REFUNDED":
      case "CANCELLED":
        return 100;
      default:
        return 0;
    }
  };

  const statusSteps = {
    CONFIRMED: "Order Placed",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
  };

  const handleReorder = () => {
    console.log("Reordering:", selectedOrder.details.product);
    alert("Reorder functionality coming soon!");
  };

  const handleDownloadInvoice = () => {
    setShowInvoiceModal(true);
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Select an order to view details
          </h2>
        </div>
      );
    }

    // Use detailed order if available, otherwise fall back to selectedOrder
    const displayOrder = detailedOrder || selectedOrder;
    const isDetailed = !!detailedOrder;

    const progressValue = getStatusProgress(displayOrder.orderStatus || selectedOrder.orderStatus);
    const isCancelled = (displayOrder.orderStatus || selectedOrder.orderStatus) === "Cancelled";
    const isRefunded = (displayOrder.orderStatus || selectedOrder.orderStatus) === "Refunded";
    const isDelivered = (displayOrder.orderStatus || selectedOrder.orderStatus) === "Delivered";

    let statusColor = "orange";
    if (isDelivered) {
      statusColor = "teal";
    } else if (isCancelled) {
      statusColor = "red";
    } else if (isRefunded) {
      statusColor = "green";
    }

    const orderId = displayOrder.orderId || selectedOrder.orderId;
    const createdAt = displayOrder.createdAt || selectedOrder.createdAt;
    const orderStatus = displayOrder.orderStatus || selectedOrder.orderStatus;
    const pricing = displayOrder.pricing || selectedOrder.pricing;
    const items = displayOrder.items || selectedOrder.items;
    const paymentMethod = displayOrder.paymentMethod || selectedOrder.paymentMethod;
    const shippingAddress = displayOrder.shippingAddress || null;
    const billingAddress = displayOrder.billingAddress || null;
    const deliveryType = displayOrder.deliveryType || null;

    return (
      <div className="space-y-6">
        {/* Loading States */}
        {loadingOrderDetails && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center gap-3">
            <Loader2 className="animate-spin text-[#00bbae]" size={24} />
            <span className="text-gray-600">Loading order details...</span>
          </div>
        )}

        {orderDetailsError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <p className="font-medium">Error loading order details:</p>
            <p className="text-sm">{orderDetailsError}</p>
          </div>
        )}

        {/* Action Buttons */}
        {isDelivered && !loadingOrderDetails && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReorder}
              className="bg-[#00bbae] hover:bg-[#02a499] text-white font-medium py-3 px-6 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag size={20} /> Order Again
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="border-2 border-[#00bbae] text-[#00bbae] hover:bg-[#00bbae] hover:text-white font-medium py-3 px-6 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Download size={20} /> {invoiceData ? "View Invoice" : "Download Invoice"}
            </button>
          </div>
        )}

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#00bbae] to-[#02a499] p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Order #{orderId}</h2>
                <p className="text-white/90 text-sm">
                  Placed on {new Date(createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold text-sm`}>
                  {orderStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Order Status Progress */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={20} className="text-[#00bbae]" />
              Shipment Status
            </h3>
            {isCancelled || isRefunded ? (
              <div
                className={`p-4 rounded-lg text-sm font-medium flex items-center gap-3 ${
                  isCancelled
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-teal-50 text-teal-700 border border-teal-200"
                }`}
              >
                {isCancelled ? <LogOut size={20} /> : <ShoppingBag size={20} />}
                {isCancelled
                  ? "This order has been cancelled."
                  : "This order has been successfully refunded."}
              </div>
            ) : (
              <>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00bbae] to-[#02a499] h-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-4 text-sm font-medium">
                  {Object.keys(statusSteps).map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center ${
                        orderStatus === step
                          ? "text-[#00bbae]"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="font-semibold">{statusSteps[step]}</span>
                      {selectedOrder.statusDates &&
                        selectedOrder.statusDates[step] && (
                          <span className="text-xs text-gray-400 mt-1">
                            {selectedOrder.statusDates[step]}
                          </span>
                        )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Addresses Section */}
          {shippingAddress && (
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin size={16} className="text-[#00bbae]" />
                    Shipping Address
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-800">{shippingAddress.nickname}</p>
                    <p>{shippingAddress.houseStreet}</p>
                    {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                    <p>
                      {shippingAddress.city}, {shippingAddress.district}, {shippingAddress.state} - {shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
                {billingAddress ? (
                  <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-[#00bbae]" />
                      Billing Address
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-800">{billingAddress.nickname}</p>
                      <p>{billingAddress.houseStreet}</p>
                      {billingAddress.apartment && <p>{billingAddress.apartment}</p>}
                      <p>
                        {billingAddress.city}, {billingAddress.district}, {billingAddress.state} - {billingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-[#00bbae]" />
                      Billing Address
                    </h4>
                    <p className="text-sm text-gray-500 italic">Same as shipping address</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={20} className="text-[#00bbae]" />
              Order Items
            </h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.productId || index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">{item.productName}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span>Color: <span className="font-medium">{item.colorName}</span></span>
                      <span>•</span>
                      <span>Age Group: <span className="font-medium">{item.ageGroupName || "N/A"}</span></span>
                      <span>•</span>
                      <span>Quantity: <span className="font-medium">{item.quantity}</span></span>
                    </div>
                    {item.brand && (
                      <p className="text-xs text-gray-500 mt-1">Brand: {item.brand}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{item.totalPrice?.toFixed(2) || item.totalPrice}</p>
                    {item.cutPricePerUnit && item.pricePerUnit < item.cutPricePerUnit && (
                      <p className="text-xs text-gray-500 line-through">
                        ₹{(item.cutPricePerUnit * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Receipt size={20} className="text-[#00bbae]" />
              Pricing Summary
            </h3>
            <div className="space-y-3 bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{pricing.subtotal?.toFixed(2) || pricing.subtotal}</span>
              </div>
              
              {pricing.totalDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">- ₹{pricing.totalDiscount?.toFixed(2) || pricing.totalDiscount}</span>
                </div>
              )}

              {pricing.couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">- ₹{pricing.couponDiscount?.toFixed(2) || pricing.couponDiscount}</span>
                </div>
              )}

              {pricing.pointsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Points Used</span>
                  <span className="font-semibold">- ₹{pricing.pointsDiscount?.toFixed(2) || pricing.pointsDiscount}</span>
                </div>
              )}

              {pricing.deliveryCharges > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">+ ₹{pricing.deliveryCharges?.toFixed(2) || pricing.deliveryCharges}</span>
                </div>
              )}

              {pricing.giftPackCharges > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Gift Pack Charges</span>
                  <span className="font-semibold">+ ₹{pricing.giftPackCharges?.toFixed(2) || pricing.giftPackCharges}</span>
                </div>
              )}

              <div className="border-t border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-[#00bbae]">₹{pricing.total?.toFixed(2) || pricing.total}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CreditCard size={16} className="text-[#00bbae]" />
                  Payment Method
                </span>
                <span className="text-sm font-medium text-gray-800">{paymentMethod || "N/A"}</span>
              </div>

              {deliveryType && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-semibold text-gray-700">Delivery Type</span>
                  <span className="text-sm font-medium text-gray-800">{deliveryType}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Section */}
        {loadingInvoice && (
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center gap-3 border border-gray-100">
            <Loader2 className="animate-spin text-[#00bbae]" size={24} />
            <span className="text-gray-600">Loading invoice...</span>
          </div>
        )}

        {invoiceError && !loadingInvoice && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-700">
            <p className="font-medium flex items-center gap-2">
              <FileText size={18} />
              Invoice Information
            </p>
            <p className="text-sm mt-1">{invoiceError}</p>
          </div>
        )}

        {invoiceData && !loadingInvoice && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <FileText size={24} />
                    Invoice Details
                  </h3>
                  {invoiceData.invoiceId && (
                    <p className="text-white/90 text-sm">
                      Invoice ID: {invoiceData.invoiceId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {invoiceData.invoiceDate && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Invoice Date</span>
                  <span className="text-gray-800 font-semibold">
                    {new Date(invoiceData.invoiceDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {invoiceData.status && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Invoice Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    invoiceData.status === "PAID" 
                      ? "bg-green-100 text-green-700" 
                      : invoiceData.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {invoiceData.status}
                  </span>
                </div>
              )}

              {invoiceData.paymentStatus && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    invoiceData.paymentStatus === "PAID" 
                      ? "bg-green-100 text-green-700" 
                      : invoiceData.paymentStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {invoiceData.paymentStatus}
                  </span>
                </div>
              )}

              {invoiceData.posInvoiceId && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">POS Invoice ID</span>
                  <span className="text-gray-800 font-semibold">{invoiceData.posInvoiceId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons for Delivered Orders */}
        {isDelivered && !loadingOrderDetails && (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowIssueModal(true);
                  setIsissue(true);
                }}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut size={20} className="transform rotate-180" /> Raise an Issue
              </button>
              <button
                onClick={() => {
                  setShowIssueModal(true);
                  setIsissue(false);
                }}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ArrowLeft size={20} className="transform rotate-180" /> Return Order
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <SubmitReview />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderOrdersList = () => {
    const filteredOrders = orders.filter(
      (order) => selectedStatus === "All" || order.orderStatus === selectedStatus
    );

    return (
      <div
        style={{
          maxHeight: "400px",
          overflowX: "auto",
          overflowY: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Order
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <div className="flex justify-center items-center h-full m-auto">
              <Loader2 className="animate-spin text-[#00bbae] flex justify-center items-center m-auto" size={24} />
            </div>
          ) : (
          <tbody>
            {!loading && filteredOrders.length > 0 ? (
              filteredOrders.map( (order) => {
              let statusBgColor = "bg-orange-100";
              let statusTextColor = "text-orange-600";
              if (order.orderStatus === "Delivered") {
                statusBgColor = "bg-teal-100";
                statusTextColor = "text-teal-600";
              } else if (order.orderStatus === "Cancelled") {
                statusBgColor = "bg-red-100";
                statusTextColor = "text-red-600";
              } else if (order.orderStatus === "Refunded") {
                statusBgColor = "bg-green-100";
                statusTextColor = "text-green-600";
              }
              return (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[75px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {order.items[0]?.productName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${statusBgColor} ${statusTextColor} px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ₹{order.pricing?.total?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOrderView(order)}
                      className="bg-[#00bbae] hover:bg-[#02a499] text-white p-2 rounded-full transition-colors shadow-sm"
                      title="View Order Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-8 text-center text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
          )}
        </table>
      </div>
    );
  };

  return (
    <div>
      <div>
        {
          <div>
            {selectedOrder ? (
              <div>
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setDetailedOrder(null);
                    setInvoiceData(null);
                    setOrderDetailsError(null);
                    setInvoiceError(null);
                  }}
                  className="mb-6 text-[#00bbae] hover:text-[#02a499] flex items-center gap-2 font-medium transition-colors"
                >
                  <ArrowLeft size={20} /> Back to Orders
                </button>
                {renderOrderDetails()}
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-4 items-center gap-2 flex-wrap">
                  <h1 className="text-[18px] leading-[24px] font-semibold text-black">
                    My Orders
                  </h1>
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full md:w-48 rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                      <option value="custom">Custom Range</option>
                    </select>

                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full md:w-48 rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                {renderOrdersList()}
              </div>
            )}
          </div>
        }

        {showInvoiceModal && selectedOrder && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close invoice"
              >
                &times;
              </button>
              <Invoice orderDetails={detailedOrder || selectedOrder} invoiceData={invoiceData} />
            </div>
          </div>
        )}

        {showIssueModal && selectedOrder && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setShowIssueModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close issue form"
              >
                &times;
              </button>
              <IssueForm
                orderDetails={selectedOrder}
                type={isIssue ? "issue" : "return"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
