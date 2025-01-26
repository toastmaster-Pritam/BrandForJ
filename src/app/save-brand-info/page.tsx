"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { generateBrandGuideline } from "@/lib/ai-prompt";
import pLimit from "p-limit";
import { useClerk, useUser } from "@clerk/nextjs";
import { AddFreeCredits } from "../actions/addFreeCredits";
import { toast } from "react-toastify";
import { Loader2, Zap } from "lucide-react";
import { brandBookSchema } from "@/schemas/zod-validation";
import GenerationLoader from "@/components/generation-loader";
import { saveBrandDetails } from "../actions/saveBrandDetails";

const limit = pLimit(1);

export interface BrandDetails {
  brandName: string;
  brandInfo: string;
  brandTone: string;
  brandColors: string;
  imageryStyle: string;
  targetAudience: string;
  bussinessMode: string;
  achievements: string;
  website_url: string;
}

export default function BrandBookPage() {
  // Input field configurations
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
      name: "brandTone",
      label: "Brand Tone & Voice",
      placeholder: "How should your brand communicate?"
    },
    {
      name: "brandColors",
      label: "Brand Colors",
      placeholder: "What are your brand's primary colors?"
    },
    {
      name: "imageryStyle",
      label: "Imagery & Visual Style",
      placeholder: "Type Your Brand Information"
    },
    {
      name: "targetAudience",
      label: "Target Audience",
      placeholder: "Who are your target audience"
    },
    {
      name: "bussinessMode",
      label: "Bussiness Mode",
      placeholder: "Mention your mode of bussiness"
    },
    {
      name: "achievements",
      label: "Key Achievements",
      placeholder: "Mention your brand's key achivements"
    },
    {
      name: "website_url",
      label: "Reference Website URL",
      placeholder: "Give us a reference website url"
    }
  ] as const;

  const [formData, setFormData] = useState<BrandDetails>(
    inputFields.reduce((acc, field) => {
      acc[field.name as keyof BrandDetails] = "";
      return acc;
    }, {} as BrandDetails)
  );

  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleInputChange = (name: keyof BrandDetails, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!isSignedIn) {
      toast.error("You need to sign in first!");
      router.push("/sign-in");
    }

    setLoading(true);

    try {
      const { error } = await saveBrandDetails(formData);

      if (error) {
        toast.error("Database error! Please try again!");
        return;
      }

      toast.success("Brand Details saved successfully!");
      setFormData(
        inputFields.reduce((acc, field) => {
          acc[field.name as keyof BrandDetails] = "";
          return acc;
        }, {} as BrandDetails)
      );
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error("Something went wrong,please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title2="Save Brand Details">
      <div className="flex flex-col items-center justify-center px-6 py-12 gap-6">
        <div className="flex gap-6 items-center justify-center">
          <Image
            src="/pic1.svg"
            alt="Placeholder Icon"
            width={36}
            height={36}
          />
          <h1 className="text-3xl font-bold text-black">
            Save Your Brand Details
          </h1>
        </div>
        <p className="text-gray-600 mt-2 italic">
          Answer a few key questions, and we&apos;ll save your brand details for
          future references.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {inputFields.map((field, index) => (
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
              {/* {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]}
                </span>
              )} */}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button
            className="px-6 py-6 rounded-xl relative overflow-hidden shadow-lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            <Image
              src={"/buttonbg.svg"}
              alt="buttonbg"
              fill
              className="object-cover absolute top-0 left-0 w-full h-full z-0 rounded-xl"
            />
            <div className="flex items-center justify-center relative z-10">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 text-white" />
                  <span className="text-xl text-white">Please wait...</span>
                </>
              ) : (
                <p className="text-xl text-white">Save</p>
              )}
            </div>
          </Button>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-gray-400 flex justify-center items-center gap-3">
          <p className="text-2xl font-bold">Powered by Forj AI 2.0</p>
          <Image
            src="/pic2.svg"
            alt="Placeholder Icon"
            width={50}
            height={50}
          />
        </div>
      </div>
    </ContentLayout>
  );
}
