"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import pLimit from "p-limit";
import { useRouter } from "next/navigation";
import { generateInfographics } from "@/lib/ai-prompt";
import { useClerk, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { AddFreeCredits } from "../actions/addFreeCredits";
import { Zap } from "lucide-react";
import { onePagerSchema as infographicsSchema } from "@/schemas/zod-validation";
import GenerationLoader from "@/components/generation-loader";

const limit = pLimit(1);

interface FormData {
  brandName: string;
  brandInfo: string;
  targetAudience: string;
  pages: string;
  brandColors: string;
  bussinessMode: string;
  achievements: string;
}
export default function BrandBookPage() {
  const pages = 5;
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
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { session, openSignIn } = useClerk();

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";

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
    const validationResult = infographicsSchema.safeParse(formData);

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
    setLoading(true);

    const prompt = generateInfographics({
      brandName: formData.brandName,
      year: "2025",
      pages,
      brandInfo: formData.brandInfo,
      brandColors: formData.brandColors,
      targetAudience: formData.targetAudience,
      bussinessMode: formData.bussinessMode,
      achievements: formData.achievements,
      type: "Infographics"
    });

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: prompt })
    });

    const rawData = await response.json();
    const rawContent = rawData?.aiResponse?.choices[0]?.message?.content;
    const cleanedContent = rawContent?.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedContent);
    const pageKeys = Object.keys(jsonResponse).slice(0, Number(pages));

    const imagePromises = pageKeys.map((pageKey) =>
      limit(async () => {
        try {
          const res = await fetch("/api/image-generation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: jsonResponse[pageKey],aspect_ratio:"16:9" })
          });

          const data = await res.json();
          return data?.imageUrl || null;
        } catch (error) {
          console.error("Error generating image for pageKey:", pageKey, error);
          return null;
        }
      })
    );

    const imageUrls = (await Promise.all(imagePromises)).filter(
      (url) => url !== null
    );

    // console.log("image urls", imageUrls);

    setLoading(false);

    // console.log(pageKeys)
    // console.log(jsonResponse)

    // Redirect to preview page with the first image and pass all image URLs
    if (imageUrls) {
      router.push(
        `/download-generated-image?firstImage=${encodeURIComponent(
          imageUrls[0]
        )}&allImages=${encodeURIComponent(JSON.stringify(imageUrls))}`
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
    <ContentLayout title2="Infographics">
      <div className="flex flex-col items-center justify-center px-6 py-12 gap-6">
        {/* Title Section */}
        <div className="flex gap-6 items-center justify-center">
          <Image
            src="/pic5.svg"
            alt="Placeholder Icon"
            width={36}
            height={36}
          />
          <h1 className="text-3xl font-bold text-black">
            Stunning Infographics
          </h1>

          <div>
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
          </div>
        </div>
        <p className="text-gray-600 mt-2 italic px-10 text-center">
          Visualize Your Brand&apos;s Story with Stunning Infographics & Creates a
          visually compelling infographic that enhances engagement and
          storytelling
        </p>

        {/* Input Section */}
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
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="mt-8">
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
              Generate Infographics
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
