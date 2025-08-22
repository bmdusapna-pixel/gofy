import React, { useState } from "react";

const IssueForm = ({ type = "return" }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const reasons = [
    "Damaged",
    "Defective",
    "Wrong Item",
    "Missing Item",
    "Other",
  ];

  const isReturn = type === "return";

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      reason: selectedReason,
      description,
      files,
      type,
    };
    console.log("Form Submitted:", formData);
    // send formData to API if needed
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-3">
        {isReturn ? "Reason for Return" : "Issue type"}
      </h2>

      {/* Reason Options */}
      <div className="space-y-3 mb-4">
        {reasons.map((reason) => (
          <label
            key={reason}
            className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer"
          >
            <span className="text-gray-700">{reason}</span>
            <input
              type="radio"
              name="reason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="form-radio text-blue-600"
            />
          </label>
        ))}
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          {isReturn ? "Description" : "Issue Description"}
        </h3>
        <textarea
          placeholder="Describe Issue"
          className="w-full border border-gray-300 rounded-lg p-2"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Add photos or videos</h3>
        <label className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-6 cursor-pointer text-gray-500">
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
          <span className="text-blue-500">📤 click here to upload</span>
        </label>

        {/* Preview */}
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-gray-300 p-2 rounded-lg text-sm text-gray-600"
              >
                <span className="truncate max-w-[70%]">{file.name}</span>
                <button
                  type="button"
                  className="text-red-500 text-xs ml-2"
                  onClick={() => handleRemoveFile(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-full"
      >
        {isReturn ? "Submit Return Request" : "Submit Complaint"}
      </button>
    </form>
  );
};

export default IssueForm;
