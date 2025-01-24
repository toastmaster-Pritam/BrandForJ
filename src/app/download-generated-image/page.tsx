"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { generatePdf } from "@/lib/generate-pdf";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function BrandPreview() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const firstImage = searchParams.get("firstImage");
  const allImages = JSON.parse(
    decodeURIComponent(searchParams.get("allImages") || "[]")
  );

  const handleDownload = async () => {
    setLoading(true);

    try {
      const formData = await generatePdf(allImages);
      console.log("hello", formData);
      toast.success("Pdf downloaded successfully!")
    } catch (error) {
      console.error(JSON.stringify(error,null,2))
      toast.error("Something went wrong!")
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <ContentLayout title2="">
  <div className="flex flex-col items-center justify-center px-6 py-12 gap-6 ">
    <h1 className="text-3xl font-bold text-black text-center">
      Generated Image Preview
    </h1>

    <div className="flex flex-col items-center w-full max-w-lg gap-6">
      {firstImage && (
        <div className="w-full max-h-[calc(100vh-300px)] overflow-hidden flex justify-center items-center">
          <Image
            src={firstImage}
            alt="Brand Preview"
            width={600}
            height={400}
            className="rounded-md shadow-lg object-contain"
          />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center my-4">
        <Button
          className="relative px-6 py-6 rounded-xl overflow-hidden"
          onClick={handleDownload}
          disabled={loading}
        >
          <Image
            src={"/buttonbg.svg"}
            alt="buttonbg"
            fill
            className="object-cover absolute top-0 left-0 w-full h-full z-0 rounded-xl"
          />
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> 
              <p className="text-white z-10">Please wait...</p>
            </>
          ) : (
            <p className="text-xl relative z-10 text-white">Download</p>
          )}
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          className="relative px-6 py-6 rounded-xl overflow-hidden bg-black text-white hover:bg-gray-700 focus:outline-none"
        >
          <p className="text-xl relative z-10 text-white">Dashboard</p>
        </Button>
      </div>
    </div>
  </div>
</ContentLayout>

  );
}
