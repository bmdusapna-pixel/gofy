import React, { useEffect, useState } from "react";
import SubmitReview from "./SubmitReview.jsx";
import Invoice from "./Invoice.jsx";
import IssueForm from "./IssueForm.jsx";
import { ShoppingBag, Download, LogOut, Eye, ArrowLeft } from "lucide-react";
import axios from "axios";
import { VITE_BASE_URL } from "../config.js";


const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [isIssue, setIsissue] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTime, setSelectedTime] = useState("all");
  const [orders,setorders] = useState([]);

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
      const response = await axios.get(`${VITE_BASE_URL}/order/myOrders`,
        {
          headers:{
            Authorization: `Bearer ${usertoken}`
          }
        }
      )
      if(response.data.success)
      {
        setorders(response.data.data)
      }
    } 
    catch (error) {
      console.log(error)
    }
  }
  
useEffect(()=>{
  fetchMyOrders();
},[])


  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(false);
    setShowIssueModal(false);
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Processing":
        return 25;
      case "Shipped":
        return 50;
      case "Delivered":
      case "Refunded":
      case "Cancelled":
        return 100;
      default:
        return 0;
    }
  };

  const statusSteps = {
    Processing: "Order Placed",
    Shipped: "Shipped",
    Delivered: "Delivered",
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
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Select an order to view details
          </h2>
        </div>
      );
    }

    const progressValue = getStatusProgress(selectedOrder.orderStatus);
    const isCancelled = selectedOrder.orderStatus === "Cancelled";
    const isRefunded = selectedOrder.orderStatus === "Refunded";
    const isDelivered = selectedOrder.orderStatus === "Delivered";

    let statusColor = "orange";
    if (isDelivered) {
      statusColor = "teal";
    } else if (isCancelled) {
      statusColor = "red";
    } else if (isRefunded) {
      statusColor = "green";
    }

    const subtotal =
      selectedOrder.pricing.total -
      selectedOrder.pricing.deliveryCharges +
      selectedOrder.pricing.totalDiscount +
      selectedOrder.pricing.couponDiscount;

      const {
        orderId,
        createdAt,
        orderStatus,
        pricing,
        items,
        paymentMethod,
      } = selectedOrder;
    

    return (
      <div className="overflow-x-auto max-h-[400px]">
        {isDelivered && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleReorder}
              className="bg-[#00bbae] hover:bg-[#02a499] text-white font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Order Again
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} /> Download Invoice
            </button>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Order #</span>
            <span className="font-semibold">{orderId}</span>
            <span>was placed on</span>
            <span className="font-semibold"> 
            {new Date(createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}</span>
            <span>and is currently</span>
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded font-semibold`}
            >
              {orderStatus}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipment Status</h2>
          {isCancelled || isRefunded ? (
            <div
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                isCancelled
                  ? "bg-red-100 text-red-700"
                  : "bg-teal-100 text-teal-700"
              }`}
            >
              {isCancelled ? <LogOut size={20} /> : <ShoppingBag size={20} />}
              {isCancelled
                ? "This order has been cancelled."
                : "This order has been successfully refunded."}
            </div>
          ) : (
            <>
              <div className="w-full bg-gray-300 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-3 text-sm font-medium">
                {Object.keys(statusSteps).map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      selectedOrder.status === step
                        ? "text-teal-600"
                        : "text-gray-500"
                    }`}
                  >
                    <span>{statusSteps[step]}</span>
                    {selectedOrder.statusDates &&
                      selectedOrder.statusDates[step] && (
                        <span className="text-xs text-gray-400">
                          {selectedOrder.statusDates[step]}
                        </span>
                      )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

         {/* Items */}
      <h2 className="text-[18px] font-semibold mb-4">Order Details</h2>
      <hr className="mb-4" />

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <div>
              <p className="font-semibold">{item.productName}</p>
              <p className="text-sm text-gray-500">
                Color: {item.colorName} | Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">₹{item.totalPrice}</p>
          </div>
        ))}

        <hr />

        {/* Pricing */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{pricing.subtotal}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- ₹{pricing.totalDiscount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span>₹{pricing.deliveryCharges}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{pricing.total}</span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="font-semibold">Payment Method</span>
          <span>{paymentMethod}</span>
        </div>
      </div>
        {isDelivered && (
          <>
            <hr className="text-gray-200 my-4" />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowIssueModal(true);
                  setIsissue(true);
                }}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={20} className="transform rotate-180" /> Raise an
                Issue
              </button>
              <button
                onClick={() => {
                  setShowIssueModal(true);
                  setIsissue(false);
                }}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} className="transform rotate-180" /> Return
                Order
              </button>
            </div>
            <hr className="text-gray-200 my-4" />
            <SubmitReview />
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
          <tbody>
            {filteredOrders.map((order) => {
              let statusColor = "orange";
              if (order.status === "Delivered") {
                statusColor = "teal";
              } else if (order.status === "Cancelled") {
                statusColor = "red";
              } else if (order.status === "Refunded") {
                statusColor = "green";
              }
              return (
                <tr key={order._id} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[75px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {order.items[0].productName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded text-sm font-medium`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₹{order.pricing.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOrderView(order)}
                      className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
                  onClick={() => setSelectedOrder(null)}
                  className="mb-4 text-teal-500 hover:text-teal-600 flex font-medium"
                >
                  <ArrowLeft /> Back to Orders
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
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close invoice"
              >
                &times;
              </button>
              <Invoice orderDetails={selectedOrder} />
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
