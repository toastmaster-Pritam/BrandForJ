import { LoadingSpinner } from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <LoadingSpinner className="text-blue-500 h-12 w-12" />
        <p className="text-gray-600 mt-4 text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
