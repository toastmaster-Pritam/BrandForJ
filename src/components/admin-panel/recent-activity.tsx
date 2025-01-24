"use client"; // Mark as client component

import React, { useState } from "react";
import Image from "next/image";
import { generatePdf } from "@/lib/generate-pdf"; // Import your utility function
import { toast } from "react-toastify";
import { Divide } from "lucide-react";

interface RecentActivityProps {
  imageUrls: { fileUrl: string[]; createdAt: string }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ imageUrls }) => {
  const [loading, setLoading] = useState<number | null>(null); // Track loading state for each card

  // Function to handle PDF generation
  const handlePdfGeneration = async (images: string[], index: number) => {
    setLoading(index); // Set loading for the specific card
    try {
      await generatePdf(images); // Call the generatePdf function with the image array
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF, please try again!");
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6">
      {!imageUrls || imageUrls.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="font-medium text-lg">
            No Files has been generated yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10 py-8">
          {/* Dynamically Render Cards */}
          {imageUrls?.map((file, index) => (
            <div
              key={index}
              className={`relative flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 overflow-hidden cursor-pointer transition-transform ease-in-out ${
                loading === index
                  ? "opacity-50 pointer-events-none"
                  : "hover:scale-105"
              }`}
              onClick={() => handlePdfGeneration(file.fileUrl, index)} // Handle clicks in the client component
            >
              {/* Show Loading Spinner */}
              {loading === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <Image
                src="/pdf.svg"
                alt="PDF Icon"
                className="w-12 h-12 flex-shrink-0"
                width={48}
                height={48}
              />
              <div className="truncate">
                <h3 className="text-gray-800 font-sm truncate">
                  Generated Content {index + 1}.pdf
                </h3>
                <p className="text-gray-500 text-xs truncate">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs truncate">
                  Click to generate PDF
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
