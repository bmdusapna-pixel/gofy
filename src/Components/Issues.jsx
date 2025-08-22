import React, { useState } from "react";
import { Eye, ArrowLeft, Image, Video } from "lucide-react";

const Issues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Dummy data for issues, including status dates and an array of media URLs
  const issues = [
    {
      id: "ISSUE001",
      orderId: 1001,
      date: "22 Aug, 2025",
      issueStatus: "Submitted",
      product: "Remote Control Car - Red",
      reason: "Damaged",
      description:
        "Car not working after receiving it. Seems like it was dropped.",
      issueDates: {
        Submitted: "22 Aug",
      },
      media: [
        "https://placehold.co/400x250/E0E7FF/000000?text=Damaged+Car+1",
        "https://placehold.co/400x250/FFEFD5/000000?text=Damaged+Car+2",
      ],
    },
    {
      id: "ISSUE002",
      orderId: 1002,
      date: "20 Aug, 2025",
      issueStatus: "Under Review",
      product: "Building Blocks Set (100 pcs)",
      reason: "Missing Item",
      description: "One bag of blocks is missing from the set.",
      issueDates: {
        Submitted: "20 Aug",
        "Under Review": "21 Aug",
      },
      media: [], // No media for this issue
    },
    {
      id: "ISSUE003",
      orderId: 1003,
      date: "18 Aug, 2025",
      issueStatus: "Resolved",
      product: "Talking Teddy Bear (Large)",
      reason: "Defective",
      description: "Teddy bear's speaker is not working properly.",
      issueDates: {
        Submitted: "18 Aug",
        "Under Review": "19 Aug",
        Resolved: "20 Aug",
      },
      media: [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://placehold.co/400x250/C6F6D5/000000?text=Defect+Image",
      ],
    },
    {
      id: "ISSUE004",
      orderId: 1004,
      date: "21 Aug, 2025",
      issueStatus: "Submitted",
      product: "Cricket Kit for Kids",
      reason: "Wrong Item",
      description: "Received a blue grip bat instead of the red one ordered.",
      issueDates: {
        Submitted: "21 Aug",
      },
      media: ["https://placehold.co/400x250/D1FAE5/000000?text=Wrong+Item"],
    },
  ];

  const handleIssueView = (issue) => {
    setSelectedIssue(issue);
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Submitted":
        return 33;
      case "Under Review":
        return 66;
      case "Resolved":
        return 100;
      default:
        return 0;
    }
  };

  const statusSteps = {
    Submitted: "Issue Submitted",
    "Under Review": "Under Review",
    Resolved: "Resolved",
  };

  const renderIssueDetails = () => {
    if (!selectedIssue) {
      return (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Select an issue to view details
          </h2>
        </div>
      );
    }

    const progressValue = getStatusProgress(selectedIssue.issueStatus);
    const isResolved = selectedIssue.issueStatus === "Resolved";

    let statusColor = "orange";
    if (isResolved) {
      statusColor = "teal";
    }

    return (
      <div className="overflow-x-auto max-h-[400px]">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Complaint ID #</span>
            <span className="font-semibold">{selectedIssue.id}</span>
            <span>was reported on</span>
            <span className="font-semibold">{selectedIssue.date}</span>
            <span>and is currently</span>
            <span
              className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded font-semibold`}
            >
              {selectedIssue.issueStatus}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Issue Status</h2>
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
                    getStatusProgress(selectedIssue.issueStatus) >=
                    getStatusProgress(step)
                      ? "text-teal-600"
                      : "text-gray-500"
                  }`}
                >
                  <span>{statusSteps[step]}</span>
                  {selectedIssue.issueDates &&
                    selectedIssue.issueDates[step] && (
                      <span className="text-xs text-gray-400">
                        {selectedIssue.issueDates[step]}
                      </span>
                    )}
                </div>
              ))}
            </div>
          </>
        </div>

        <h2 className="text-[18px] leading-[24px] font-semibold text-black mb-4">
          Issue details
        </h2>
        <hr className=" text-gray-200 " />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Product Name:</span>
            <span>{selectedIssue.product}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Reason for Issue:</span>
            <span>{selectedIssue.reason}</span>
          </div>
          <div className="flex flex-col items-start mt-2">
            <span className="font-semibold mb-1">Description:</span>
            <p className="text-gray-700 text-sm">{selectedIssue.description}</p>
          </div>

          {/* Display uploaded media if available */}
          {selectedIssue.media && selectedIssue.media.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Uploaded Media:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedIssue.media.map((mediaUrl, index) => {
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
                          alt={`Issue Media ${index + 1}`}
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
          <span>#{selectedIssue.orderId}</span>
        </div>
      </div>
    );
  };

  const renderIssuesList = () => (
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
              Complaint ID
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
          {issues.map((issue) => {
            let statusColor = "orange";
            if (issue.issueStatus === "Resolved") {
              statusColor = "teal";
            }
            return (
              <tr key={issue.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {issue.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[75px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {issue.product}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {issue.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded text-sm font-medium`}
                  >
                    {issue.issueStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleIssueView(issue)}
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
      {selectedIssue ? (
        <div>
          <button
            onClick={() => setSelectedIssue(null)}
            className="mb-4 text-teal-500 hover:text-teal-600 flex font-medium"
          >
            <ArrowLeft /> Back to Issues
          </button>
          {renderIssueDetails()}
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-[18px] leading-[24px] font-semibold text-black">
              My Issues
            </h1>
          </div>
          {renderIssuesList()}
        </div>
      )}
    </div>
  );
};

export default Issues;
