import React, { useState } from "react";
import SubmitReview from "./SubmitReview.jsx";
import Invoice from "./Invoice.jsx"; // Import the new Invoice component
import {
  ShoppingBag,
  Download,
  MapPin,
  User,
  LogOut,
  Eye,
  ArrowLeft,
} from "lucide-react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false); // New state for controlling invoice modal visibility

  const orders = [
    {
      id: 1001,
      date: "19 Aug, 2025",
      status: "Processing",
      total: 1499.0,
      discount: 50.0,
      couponDiscount: 20.0,
      deliveryCharges: 40.0,
      items: 1,
      details: {
        product: "Remote Control Car - Red",
        customColor: "Red (Default) - Free",
        accessories: "Rechargeable Battery Pack - (₹299.00)",
        warranty: "6-Month Warranty - (₹249.00)",
        paymentMethod: "UPI",
      },
    },
    {
      id: 1002,
      date: "18 Aug, 2025",
      status: "Shipped",
      total: 899.0,
      discount: 25.0,
      couponDiscount: 10.0,
      deliveryCharges: 40.0,
      items: 2,
      details: {
        product: "Building Blocks Set (100 pcs) x 2",
        customColor: "Multicolor - Free",
        accessories: "Storage Box - (₹149.00)",
        warranty: "1-Year Warranty - (₹199.00)",
        paymentMethod: "Cash on Delivery",
      },
    },
    {
      id: 1003,
      date: "17 Aug, 2025",
      status: "Delivered",
      total: 2199.0,
      discount: 100.0,
      couponDiscount: 50.0,
      deliveryCharges: 0.0,
      items: 1,
      details: {
        product: "Talking Teddy Bear (Large)",
        customColor: "Brown - Free",
        accessories: "Gift Wrap - (₹49.00)",
        warranty: "2-Year Warranty - (₹349.00)",
        paymentMethod: "NetBanking",
      },
    },
    {
      id: 1004,
      date: "16 Aug, 2025",
      status: "Processing",
      total: 1299.0,
      discount: 75.0,
      couponDiscount: 25.0,
      deliveryCharges: 40.0,
      items: 3,
      details: {
        product: "Cricket Kit for Kids (Bat, Ball, Stumps) x 3",
        customColor: "Blue Grip - Free",
        accessories: "Extra Tennis Ball - (₹99.00)",
        warranty: "6-Month Warranty - (₹199.00)",
        paymentMethod: "Credit Card",
      },
    },
    {
      id: 1005,
      date: "15 Aug, 2025",
      status: "Cancelled",
      total: 749.0,
      discount: 0.0,
      couponDiscount: 0.0,
      deliveryCharges: 40.0,
      items: 1,
      details: {
        product: "Puzzle Game - India Map",
        customColor: "Multicolor Print - Free",
        accessories: "Magnetic Board - (₹199.00)",
        warranty: "1-Year Warranty - (₹149.00)",
        paymentMethod: "Debit Card",
      },
    },
    {
      id: 1006,
      date: "14 Aug, 2025",
      status: "Refunded",
      total: 399.0,
      discount: 0.0,
      couponDiscount: 0.0,
      deliveryCharges: 40.0,
      items: 1,
      details: {
        product: "Kids Art Set",
        customColor: "N/A",
        accessories: "Case - (₹99.00)",
        warranty: "6-Month Warranty - (₹99.00)",
        paymentMethod: "NetBanking",
      },
    },
  ];

  const handleOrderView = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(false); // Close invoice modal if open when viewing new order
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
    // Logic to handle reordering the product
    console.log("Reordering:", selectedOrder.details.product);
    // In a real application, you'd likely redirect to a product page or add to cart
    alert("Reorder functionality coming soon!");
  };

  const handleDownloadInvoice = () => {
    // Set state to true to show the invoice modal
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

    const progressValue = getStatusProgress(selectedOrder.status);
    const isCancelled = selectedOrder.status === "Cancelled";
    const isRefunded = selectedOrder.status === "Refunded";
    const isDelivered = selectedOrder.status === "Delivered";

    let statusColor = "orange";
    if (isDelivered) {
      statusColor = "teal";
    } else if (isCancelled) {
      statusColor = "red";
    } else if (isRefunded) {
      statusColor = "green";
    }

    // Calculate subtotal
    const subtotal =
      selectedOrder.total -
      selectedOrder.deliveryCharges +
      selectedOrder.discount +
      selectedOrder.couponDiscount;

    return (
      <div className="overflow-x-auto max-h-[400px]">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Order #</span>
            <span className="font-semibold">{selectedOrder.id}</span>
            <span>was placed on</span>
            <span className="font-semibold">{selectedOrder.date}</span>
            <span>and is currently</span>
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded font-semibold`}
            >
              {selectedOrder.status}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Shipment Status</h2>
          {isCancelled ? (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
              <LogOut size={20} /> This order has been cancelled.
            </div>
          ) : isRefunded ? (
            <div className="bg-teal-100 text-teal-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
              <ShoppingBag size={20} /> This order has been successfully
              refunded.
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
                    className={`text-center ${
                      selectedOrder.status === step
                        ? "text-teal-600"
                        : "text-gray-500"
                    }`}
                  >
                    {statusSteps[step]}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <h2 className="text-[18px] leading-[24px] font-semibold text-black mb-4">
          Order details
        </h2>
        <hr className=" text-gray-200 " />

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Product</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{selectedOrder.details.product}</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    Custom Toy Color:{" "}
                    <span>{selectedOrder.details.customColor}</span>
                  </div>
                  <div>
                    Extra Accessories:{" "}
                    <span className="font-medium">
                      {selectedOrder.details.accessories}
                    </span>
                  </div>
                  <div>
                    Extended Warranty:{" "}
                    <span className="font-medium">
                      {selectedOrder.details.warranty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-semibold mb-2">Total MRP</h3>
            </div>
          </div>

          <hr className=" text-gray-200 " />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total MRP:</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span className="font-semibold">Discount on MRP:</span>
            <span className="font-semibold">
              - ₹{selectedOrder.discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span className="font-semibold">Coupon Discount:</span>
            <span className="font-semibold">
              - ₹{selectedOrder.couponDiscount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Delivery Charges:</span>
            <span className="font-semibold">
              + ₹{selectedOrder.deliveryCharges.toFixed(2)}
            </span>
          </div>
          <hr className=" text-gray-200 " />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Payment method:</span>
            <span>{selectedOrder.details.paymentMethod}</span>
          </div>
          <hr className=" text-gray-200 " />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span>₹{selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>
        {isDelivered && (
          <>
            <hr className="text-gray-200 my-4" />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReorder}
                className="bg-[#00bbae] hover:bg-[#02a499] text-white font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} /> Order Again
              </button>
              <button
                onClick={handleDownloadInvoice} // This will now show the modal
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex-1 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download Invoice
              </button>
            </div>
            <hr className="text-gray-200 my-4" />
            <SubmitReview />
          </>
        )}
      </div>
    );
  };

  const renderOrdersList = () => (
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
          {orders.map((order) => {
            let statusColor = "orange";
            if (order.status === "Delivered") {
              statusColor = "teal";
            } else if (order.status === "Cancelled") {
              statusColor = "red";
            } else if (order.status === "Refunded") {
              statusColor = "green";
            }
            return (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[75px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {order.details.product}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded text-sm font-medium`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ₹{order.total.toFixed(2)}
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
                <div className="flex justify-between mb-4 items-center">
                  <h1 className="text-[18px] leading-[24px] font-semibold text-black">
                    My Orders
                  </h1>
                  <select className="w-full md:w-48 rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer">
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                {renderOrdersList()}
              </div>
            )}
          </div>
        }

        {/* Invoice Modal - Conditionally rendered */}
        {showInvoiceModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
      </div>
    </div>
  );
};

export default Orders;
