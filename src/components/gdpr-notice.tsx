import { useState } from "react";
import { X, Lock } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const GdprNotice = () => {
  const [showNotice, setShowNotice] = useState(true);

  const handleClose = () => {
    setShowNotice(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative text-center">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex justify-center mb-4">
          <Lock className="h-10 w-10 text-gray-700" />
        </div>
        <div className="px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            GDPR Compliance Notice
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            At BrandForj, we value your privacy and comply with GDPR
            regulations. Your data is securely stored, never sold, and used only
            to enhance your experience. For more details, review our Privacy
            Policy or contact us at [support@brandforj.com].
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            asChild
            className="bg-blue-600 text-white rounded-full px-4 py-2 font-medium shadow hover:bg-blue-700"
          >
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
          </Button>
          <Button
            asChild
            className="border border-gray-300 text-gray-700 rounded-full px-4 py-2 font-medium shadow hover:bg-gray-100 bg-gray-50"
          >
            <Link href="/terms-conditions" target="_blank">
              Terms & Conditions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GdprNotice;
