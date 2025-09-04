import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
        404
      </h1>

      <div className="bg-[#00BBAE] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <p className="mt-6 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <div className="mt-8">
        <a
          href="/"
          className="relative inline-block px-6 py-3 font-medium text-white bg-[#00BBAE] rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
