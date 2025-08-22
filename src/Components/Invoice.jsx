import React from "react";
import { Download } from "lucide-react";

const Invoice = ({ orderDetails }) => {
  // Ensure orderDetails are provided
  if (!orderDetails) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
          No order details provided for invoice.
        </h2>
      </div>
    );
  }

  // Calculate subtotal for display
  const subtotal =
    orderDetails.total -
    orderDetails.deliveryCharges +
    orderDetails.discount +
    orderDetails.couponDiscount;

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
        <div className="flex items-center gap-4">
          {" "}
          {/* Changed to flex for button alignment */}
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Invoice Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Order ID:{" "}
              <span className="font-semibold text-gray-800">
                #{orderDetails.id}
              </span>
            </p>
          </div>
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200 ease-in-out"
          >
            <Download className="h-4 w-4" />
            Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Billed To
          </h2>
          <p className="text-gray-600">Customer Name (Placeholder)</p>
          <p className="text-gray-600">123 Main Street</p>
          <p className="text-gray-600">Anytown, State 12345</p>
          <p className="text-gray-600">customer@example.com</p>
        </div>
        <div className="md:text-right">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Ship To</h2>
          <p className="text-gray-600">Customer Name (Placeholder)</p>
          <p className="text-gray-600">Delivery Address (Same as billing)</p>
          <p className="text-gray-600">City, State, Zip Code</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Order Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm text-gray-800">
                  <p className="font-medium">{orderDetails.details.product}</p>
                  <p className="text-xs text-gray-500">
                    Custom Toy Color: {orderDetails.details.customColor}
                  </p>
                  <p className="text-xs text-gray-500">
                    Extra Accessories: {orderDetails.details.accessories}
                  </p>
                  <p className="text-xs text-gray-500">
                    Extended Warranty: {orderDetails.details.warranty}
                  </p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {orderDetails.items}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-800">
                  ₹{subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold text-gray-800">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-green-600">
            <span className="text-gray-700">Discount on MRP:</span>
            <span className="font-semibold">
              - ₹{orderDetails.discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-green-600">
            <span className="text-gray-700">Coupon Discount:</span>
            <span className="font-semibold">
              - ₹{orderDetails.couponDiscount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700">Delivery Charges:</span>
            <span className="font-semibold">
              + ₹{orderDetails.deliveryCharges.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-300 mt-2 text-lg font-bold text-gray-800">
            <span>Total Amount:</span>
            <span>₹{orderDetails.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-sm text-gray-600">
            <span>Payment Method:</span>
            <span className="font-medium">
              {orderDetails.details.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        Thank you for your business!
      </div>
    </div>
  );
};

export default Invoice;
