import React, { useState } from "react";
import { Eye, ArrowLeft, Image, Video } from "lucide-react";

const Returns = () => {
  const [selectedReturn, setSelectedReturn] = useState(null);

  const returns = [
    {
      id: "RET001",
      orderId: 1003,
      date: "20 Aug, 2025",
      returnStatus: "Pickup Scheduled", // Updated status
      product: "Talking Teddy Bear (Large)",
      reason: "Damaged",
      totalRefund: 2199.0,
      returnDates: {
        "Request Submitted": "20 Aug",
        "Pickup Scheduled": "21 Aug",
      },
      media: [
        "https://placehold.co/400x250/FFEFD5/000000?text=Damaged+Product+1",
        "https://placehold.co/400x250/FFFACD/000000?text=Damaged+Product+2",
      ],
    },
    {
      id: "RET002",
      orderId: 1005,
      date: "17 Aug, 2025",
      returnStatus: "Refund Processed", // Updated status
      product: "Puzzle Game - India Map",
      reason: "Wrong Item",
      totalRefund: 749.0,
      returnDates: {
        "Request Submitted": "17 Aug",
        "Pickup Scheduled": "18 Aug",
        "Item Received": "19 Aug",
        "Refund Processed": "20 Aug",
      },
      media: [], // No media for this return
    },
    {
      id: "RET003",
      orderId: 1006,
      date: "15 Aug, 2025",
      returnStatus: "Refund Complete", // Updated status
      product: "Kids Art Set",
      reason: "Defective",
      totalRefund: 399.0,
      returnDates: {
        "Request Submitted": "15 Aug",
        "Pickup Scheduled": "16 Aug",
        "Item Received": "17 Aug",
        "Refund Processed": "18 Aug",
        "Refund Complete": "20 Aug",
      },
      media: [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://placehold.co/400x250/C6F6D5/000000?text=Defect+Video+Image",
      ],
    },
    {
      id: "RET004",
      orderId: 1001,
      date: "20 Aug, 2025",
      returnStatus: "Request Submitted", // Updated status
      product: "Remote Control Car - Red",
      reason: "Other",
      totalRefund: 1499.0,
      returnDates: {
        "Request Submitted": "20 Aug",
      },
      media: ["https://placehold.co/400x250/D1FAE5/000000?text=Other+Reason"],
    },
  ];

  const handleReturnView = (item) => {
    setSelectedReturn(item);
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Request Submitted":
        return 20;
      case "Pickup Scheduled":
        return 40;
      case "Item Received":
        return 60;
      case "Refund Processed":
        return 80;
      case "Refund Complete":
        return 100;
      default:
        return 0;
    }
  };

  const statusSteps = {
    "Request Submitted": "Request Submitted",
    "Pickup Scheduled": "Pickup Scheduled",
    "Item Received": "Item Received",
    "Refund Processed": "Refund Processed",
    "Refund Complete": "Refund Complete",
  };

  const renderReturnDetails = () => {
    if (!selectedReturn) {
      return (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Select a return to view details
          </h2>
        </div>
      );
    }

    const progressValue = getStatusProgress(selectedReturn.returnStatus);
    const isRefunded = selectedReturn.returnStatus === "Refund Complete"; // Check for "Refund Complete"

    let statusColor = "orange";
    if (isRefunded) {
      statusColor = "teal";
    }

    return (
      <div className="overflow-x-auto max-h-[400px]">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Request ID #</span>
            <span className="font-semibold">{selectedReturn.id}</span>
            <span>was initiated on</span>
            <span className="font-semibold">{selectedReturn.date}</span>
            <span>and is currently</span>
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded font-semibold`}
            >
              {selectedReturn.returnStatus}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Return Status</h2>
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
                    getStatusProgress(selectedReturn.returnStatus) >=
                    getStatusProgress(step)
                      ? "text-teal-600"
                      : "text-gray-500"
                  }`}
                >
                  <span>{statusSteps[step]}</span>
                  {selectedReturn.returnDates &&
                    selectedReturn.returnDates[step] && (
                      <span className="text-xs text-gray-400">
                        {selectedReturn.returnDates[step]}
                      </span>
                    )}
                </div>
              ))}
            </div>
          </>
        </div>

        <h2 className="text-[18px] leading-[24px] font-semibold text-black mb-4">
          Return details
        </h2>
        <hr className=" text-gray-200 " />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Product Name:</span>
            <span>{selectedReturn.product}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Reason for Return:</span>
            <span>{selectedReturn.reason}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold mt-4">
            <span>Total Refund Amount:</span>
            <span>₹{selectedReturn.totalRefund.toFixed(2)}</span>
          </div>

          {/* Display uploaded media if available */}
          {selectedReturn.media && selectedReturn.media.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Uploaded Media:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedReturn.media.map((mediaUrl, index) => {
                  const mediaType =
                    mediaUrl.includes(".mp4") || mediaUrl.includes(".webm")
                      ? "video"
                      : "image";
                  return (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg overflow-hidden"
                    >
                      {mediaType === "image" && (
                        <img
                          src={mediaUrl}
                          alt={`Return Media ${index + 1}`}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      )}
                      {mediaType === "video" && (
                        <video
                          controls
                          src={mediaUrl}
                          className="w-full h-auto object-cover rounded-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <hr className="text-gray-200 my-4" />
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Associated Order ID:</span>
          <span>#{selectedReturn.orderId}</span>
        </div>
      </div>
    );
  };

  const renderReturnsList = () => (
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
              Request ID
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {returns.map((item) => {
            let statusColor = "orange";
            if (item.returnStatus === "Refund Complete") {
              statusColor = "teal";
            }
            return (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[75px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.product}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded text-sm font-medium`}
                  >
                    {item.returnStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleReturnView(item)}
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
      {selectedReturn ? (
        <div>
          <button
            onClick={() => setSelectedReturn(null)}
            className="mb-4 text-teal-500 hover:text-teal-600 flex font-medium"
          >
            <ArrowLeft /> Back to Returns
          </button>
          {renderReturnDetails()}
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-[18px] leading-[24px] font-semibold text-black">
              My Returns
            </h1>
          </div>
          {renderReturnsList()}
        </div>
      )}
    </div>
  );
};

export default Returns;
