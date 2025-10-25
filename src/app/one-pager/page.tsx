"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { generateInfographics, generateOnePagerPrompt } from "@/lib/ai-prompt";
import pLimit from "p-limit";
import { useRouter } from "next/navigation";
import GenerationLoader from "@/components/generation-loader";
import { useClerk, useUser } from "@clerk/nextjs";
import { Loader2, Zap } from "lucide-react";
import { toast } from "react-toastify";
import { AddFreeCredits } from "../actions/addFreeCredits";
import { onePagerSchema } from "@/schemas/zod-validation";
import { fork } from "child_process";
import { fetchBrandDetails } from "../actions/fetchBrandDetails";

const limit = pLimit(1);

interface FormData {
  brandName: string;
  brandInfo: string;
  targetAudience: string;
  pages: string;
  brandColors: string;
  bussinessMode: string;
  achievements: string;
  website_url?:string;
}
export default function BrandBookPage() {
  // Input field configurations
  const pages = 1;
  const inputFields = [
    {
      name: "brandName",
      label: "Brand Name",
      placeholder: "What is the name of your brand?"
    },
    {
      name: "brandInfo",
      label: "Brand Information",
      placeholder: "Type Your Brand Information"
    },
    {
      name: "brandColors",
      label: "Brand Colors",
      placeholder: "What are your brand's primary colors?"
    },
    {
      name: "targetAudience",
      label: "targetAudience",
      placeholder: "What audience you target?"
    },
    {
      name: "bussinessMode",
      label: "Bussiness Mode",
      placeholder: "What is your bussiness mode?"
    },
    {
      name: "achievements",
      label: "Key Achievements",
      placeholder: "What are your key achievements?"
    },
    {
      name:"website_url",
      label:"Reference Website",
      placeholder:"Reference website"
    }
  ] as const;

  const [formData, setFormData] = useState<FormData>(
    inputFields.reduce((acc, field) => {
      acc[field.name as keyof FormData] = "";
      return acc;
    }, {} as FormData)
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [loading, setLoading] = useState(false);
  const [fetchingBrandInfo, setFetchingBrandInfo] = useState(false);
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { session, openSignIn } = useClerk();

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";

    async function fetchDetails() {
      setFetchingBrandInfo(true);
  
      try {
        const { error, details } = await fetchBrandDetails();
  
        if (error) {
          toast.error(error);
          console.error(JSON.stringify(error, null, 2));
        }
  
        console.log("brand details", details?.details);
  
        setFormData((prevState) => ({
          ...prevState,
          brandName: details?.details.brandName || prevState.brandName,
          brandInfo: details?.details.brandInfo || prevState.brandInfo,
          targetAudience: details?.details.targetAudience || prevState.targetAudience,
          brandColors: details?.details.brandColors || prevState.brandColors,
          bussinessMode: details?.details.bussinessMode || prevState.bussinessMode,
          achievements:details?.details.achievements || prevState.achievements,
          website_url:details?.details.website_url || prevState.website_url
        }));
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      } finally {
        setFetchingBrandInfo(false);
      }
    }

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: undefined // Clear error when user types
    }));
  };

  const handleSubmit = async () => {
    // console.log("credits",credits)

    const validationResult = onePagerSchema.safeParse(formData);

    if (!validationResult.success) {
      // Extract validation errors
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(
        Object.entries(fieldErrors).reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value?.[0] }),
          {}
        )
      );
      toast.error("Please fix the errors in the form.");
      return;
    }

    if (!credits || Number(credits) === 0) {
      toast.error("You have no credits left!");
      return null;
    }
    let imageUrls:string[]=[]

    
    setLoading(true);

    try {
      const prompt = generateOnePagerPrompt({
        ...formData
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: prompt })
      });

      const rawData = await response.json();
      const rawContent = rawData?.aiResponse?.choices[0]?.message?.content;
      console.log("AI Response:", rawContent);

      const res = await fetch("/api/image-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rawContent, aspect_ratio: "9:16" })
      });

      const data = await res.json();
      const imageUrl = data?.imageUrl || null;

      imageUrls.push(imageUrl)
      

      console.log("Generated Image URL:", imageUrl);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error("Server Error,Please try again!")
    }
    finally{
      setLoading(false);
      
    }

    
    // Redirect to preview page with the first image and pass all image URLs
    if (imageUrls && imageUrls[0] && imageUrls.length!==0) {
      router.push(
        `/download-generated-image?firstImage=${encodeURIComponent(
          imageUrls[0]
        )}&allImages=${encodeURIComponent(JSON.stringify(imageUrls))}&pdfName=${encodeURIComponent("one-pager")}`
      );

      const res = await fetch("/api/save-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrls
        })
      });

      const data = await res.json();

      console.log(data);
    }
    else{
      toast.error("Something went wrong,please try again!")
    }

  };

  async function handleClick() {
    const { success, error } = await AddFreeCredits();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("10 credits added successfully!");
    session?.reload();
  }

  return loading ? (
    <GenerationLoader />
  ) : (
    <ContentLayout title2="One Pager">
      <div className="flex flex-col items-center justify-center px-6 py-12 gap-6">
        {/* Title Section */}
        <div className="flex gap-6 items-center justify-center">
          <Image
            src="/pic4.svg"
            alt="Placeholder Icon"
            width={36}
            height={36}
          />
          <h1 className="text-3xl font-bold text-black">
            One Pager to impress your investors
          </h1>
          <div className="flex gap-6">
            {isSignedIn && newUser && (
              <Button
                size={"sm"}
                variant={"outline"}
                className="border-emerald-500"
                onClick={handleClick}
              >
                Redeem 10 Free credits
              </Button>
            )}

            {isSignedIn && typeof credits === "number" && (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-zinc-500">Credits:</span>
                <span className="font-medium">{credits}</span>
              </div>
            )}
            <Button
              className="px-4 py-3 rounded-full relative overflow-hidden shadow-lg "
              onClick={fetchDetails}
              disabled={fetchingBrandInfo}
            >
              <Image
                src={"/buttonbg.svg"}
                alt="buttonbg"
                fill
                className="object-cover absolute top-0 left-0 w-full h-full z-0 "
              />
              {fetchingBrandInfo ? (
                <>
                  <Loader2 className="animate-spin mr-2" />{" "}
                </>
              ) : (
                <p className=" relative z-10 text-white">Use my brand</p>
              )}
            </Button>
          </div>
          {/* {isSignedIn && !paidUser && !newUser && (
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => router.push("/subscription")}
            >
              Get more credits
            </Button>
          )} */}
        </div>
        <p className="text-gray-600 mt-2 italic px-10 text-center">
          Get an AI-generated professional one-pager to impress investors,
          partners, and customers. Answer these quick questions to generate
          yours.
        </p>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {inputFields.filter((field) => field.name !== "website_url").map((field, index) => (
            <div key={index} className="relative flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700 italic">
                {field.label}
              </label>
              <div className="relative rounded-md overflow-hidden p-[2px] bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="block w-full rounded-md bg-white focus-visible:outline-none focus-visible:ring-0 px-2 py-2 text-sm"
                  value={formData[field.name]}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                />
              </div>
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="mt-8 flex flex-col  items-center gap-4 justify-center">
        <div className="relative flex flex-col gap-2 w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 italic text-center">
              Provide Reference Website
            </label>
            <div className="relative rounded-md overflow-hidden p-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
              <input
                type="text"
                placeholder="Paste your website URL here"
                className="block w-full rounded-md bg-white focus-visible:outline-none focus-visible:ring-0 px-2 py-2 text-sm"
                value={formData.website_url || ""}
                onChange={(e) =>
                  handleInputChange("website_url", e.target.value)
                }
              />
            </div>
          </div>
          <Button
            className="px-6 py-6 rounded-xl relative overflow-hidden shadow-lg"
            onClick={handleSubmit}
          >
            {/* Background Image */}
            <Image
              src={"/buttonbg.svg"}
              alt="buttonbg"
              fill
              className="object-cover absolute top-0 left-0 w-full h-full z-0 rounded-xl"
            />
            {/* Button Text */}
            <p className="text-xl relative z-10 text-white">
              Generate One Pager
            </p>
          </Button>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-gray-400 flex justify-center items-center gap-3">
          <p className="text-2xl font-bold">Powered by Forj AI 2.0</p>
          <Image
            src="/pic2.svg" // Placeholder for the AI icon
            alt="Placeholder Icon"
            width={50}
            height={50}
          />
        </div>
      </div>
    </ContentLayout>
  );
}
