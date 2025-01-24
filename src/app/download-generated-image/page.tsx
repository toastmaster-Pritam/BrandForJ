"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { generatePdf } from "@/lib/generate-pdf";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function BrandPreview() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const firstImage = searchParams.get("firstImage");
  const allImages = JSON.parse(decodeURIComponent(searchParams.get("allImages") || "[]"));

  const handleDownload = async() => {
    const formData=await generatePdf(allImages);
    console.log("hello",formData)
  };

  return (
    <ContentLayout title2="">
    <div className="flex flex-col items-center justify-center px-6 py-12 gap-6">
    
      <h1 className="text-3xl font-bold text-black">Generated Image Preview</h1>
      
      {firstImage && (
        <div className="w-full max-w-lg">
          <Image src={firstImage} alt="Brand Preview" width={600} height={400} className="rounded-md shadow-lg" />
        </div>
      )}
       <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
       <Button
            className="px-6 py-6 rounded-xl relative overflow-hidden"
            onClick={handleDownload}
            
          >
            <Image
              src={"/buttonbg.svg"}
              alt="buttonbg"
              fill
              className="object-cover absolute top-0 left-0 w-full h-full z-0 rounded-xl"
            />
           
           <p className="text-xl relative z-10 text-white">
              Download
            </p>
              
            
          </Button>
      <Button
        onClick={() => router.push("/dashboard")}
        className="px-6 py-6 rounded-xl relative overflow-hidden bg-black text-white hover:bg-gray-700 focus:outline-none"
      >
        <p className="text-xl relative z-10 text-white">
              Dashboard
            </p>
      </Button>

       </div>
    </div>
    </ContentLayout>
  );
}
