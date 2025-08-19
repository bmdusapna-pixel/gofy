import React, { useState } from "react";
import { Star } from "lucide-react";

const App = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log({
      rating,
      reviewText,
      name,
      email,
      selectedFile: selectedFile ? selectedFile.name : null,
    });
    alert("Review submitted! Check console for data.");
    // Reset form after submission
    setRating(0);
    setReviewText("");
    setName("");
    setEmail("");
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a review</h2>
      <p className="text-sm text-red-600 mb-6">
        Your email address will not be published. Required fields are marked *
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="rating"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Rating *
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                className={`cursor-pointer ${
                  starValue <= rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(starValue)}
                size={28}
              />
            ))}
          </div>
          {rating === 0 && (
            <p className="text-red-500 text-sm mt-1">Please select a rating.</p>
          )}
        </div>

        <div>
          <label
            htmlFor="reviewText"
            className="block text-gray-700 font-medium mb-2"
          >
            Your Review *
          </label>
          <textarea
            id="reviewText"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-y min-h-[50px]"
            rows="1"
            placeholder="Your Review *"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="file-upload"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload image/video (optional)
          </label>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out"
            >
              Choose File
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </label>
            <span className="text-gray-500">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Your name *
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Your email *
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              placeholder="Your email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
