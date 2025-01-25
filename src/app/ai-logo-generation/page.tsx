"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { generateLogoPrompt } from "@/lib/ai-prompt";
import { useClerk, useUser } from "@clerk/nextjs";
import { AddFreeCredits } from "../actions/addFreeCredits";
import { toast } from "react-toastify";
import { Loader2, Zap } from "lucide-react";
import { brandDeckSchema as aiLogoSchema } from "@/schemas/zod-validation";

interface FormData {
  brandName: string;
  brandInfo: string;
  brandColors: string;
}

export default function BrandOnePager() {
  const inputFields = [
    {
      name: "brandName",
      label: "Brand Name",
      placeholder: "What is the name of your brand?",
    },
    {
      name: "brandInfo",
      label: "Brand Identity",
      placeholder: "Tell us about your brand name and industry",
    },
    {
      name: "brandColors",
      label: "Brand Colors",
      placeholder: "What are your brand's primary colors?",
    },
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

  const [images, setImages] = useState<(string | null)[]>(Array(4).fill(null));
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [lastGeneratedImageIndex, setLastGeneratedImageIndex] = useState<number>(-1);
  const { user, isSignedIn } = useUser();
  const { session, openSignIn } = useClerk();
  const [isGenerating, setIsGenerating] = useState(false);

  const credits = user?.publicMetadata?.credits;
  const newUser = typeof credits === "undefined";

  async function handleClick() {
    const { success, error } = await AddFreeCredits();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("10 credits added successfully!");
    session?.reload();
  }

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: undefined // Clear error when user types
    }));
  };

  const handleGenerateLogo = async () => {

    const validationResult = aiLogoSchema.safeParse(formData);

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

    setIsGenerating(true); 

    // Determine the next index in a circular pattern

    const nextIndex =
      images.every((image) => image !== null) // If all slots are full
        ? (lastGeneratedImageIndex + 1) % images.length
        : images.findIndex((image) => image === null); // Find the first empty slot

    console.log("Current loadingIndex:", loadingIndex);
    console.log("Next index:", nextIndex);
    console.log("Images array:", images);

    setLoadingIndex(nextIndex);

    const prompt = generateLogoPrompt({
      brandName: formData.brandName,
      brandIdentity: formData.brandInfo,
      brandColors: formData.brandColors,
    });

    try {
      const res = await fetch("/api/image-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt,aspect_ratio:"1:1" }),
      });

      const data = await res.json();
      const newImageUrl = data?.imageUrl || null;

      console.log("Generated Image URL:", newImageUrl);

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[nextIndex] = newImageUrl;
        return updatedImages;
      });

      setLastGeneratedImageIndex(nextIndex); // Update the last generated index

      if(newImageUrl){

        const res= await fetch("/api/save-images",{
          method: "POST",
              headers: { "Content-Type": "application/json" },
              body:JSON.stringify({
                imageUrls:[newImageUrl]
              })
  
        })
  
        const data=await res.json()
  
        console.log(data)

      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoadingIndex(null);
      setIsGenerating(false)
      session?.reload();
    }
  };

  return (
    <ContentLayout title2="AI Logo Generator">
      <div className="flex flex-col items-center justify-center px-6 py-12 gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Image src="/pic6.svg" alt="Placeholder Icon" width={36} height={36} />
          <h1 className="text-3xl font-bold text-black text-center sm:text-left">AI-Generated Logo</h1>
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
        <p className="text-gray-600 mt-2 italic">
          Create a Unique, AI-Generated Logo for Your Brand, AI will create
          multiple logo variations for you.
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
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-52 h-52 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shadow-xl border-gray-300 border-4"
            >
              {loadingIndex === index ? (
                <div className="w-8 h-8 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
              ) : image ? (
                <Image
                  src={image}
                  alt={`ai-logo-${index}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-sm text-gray-400">Placeholder</p>
              )}
            </div>
          ))}
        </div>

        <Button
          className="px-6 py-6 rounded-xl relative overflow-hidden shadow-lg"
          onClick={handleGenerateLogo}
          disabled={isGenerating}
        >
         {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Please wait...
            </>
          ) : (
            <>
              <Image
                src={"/buttonbg.svg"}
                alt="buttonbg"
                fill
                className="object-cover absolute top-0 left-0 w-full h-full z-0 rounded-xl"
              />
              <p className="text-xl relative z-10 text-white">Generate Logo</p>
            </>
          )}
        </Button>

        <div className="text-gray-400 flex justify-center items-center gap-3">
          <p className="text-2xl font-bold">Powered by Forj AI 2.0</p>
          <Image src="/pic2.svg" alt="Placeholder Icon" width={50} height={50} />
        </div>
      </div>
    </ContentLayout>
  );
}
