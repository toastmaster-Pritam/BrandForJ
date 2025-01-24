"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const typewriterTexts = [
  "Hold on! AI is generating...",
  "Just a moment, your masterpiece is on its way...",
  "Hang tight! Processing your request...",
];

const fadingTexts = [
  "Hold tight! Your professional branding assets will be ready in a moment!",
  "Did you know? 90% of consumers choose brands with strong visual identities!",
  "AI is analyzing your inputs to create the perfect branding!",
  "Did you know? Simplicity in branding improves customer recall by 42%!",
];

const GenerationLoader = () => {
  const [currentTypewriterText, setCurrentTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterCharIndex, setTypewriterCharIndex] = useState(0);

  const [currentFadingText, setCurrentFadingText] = useState(fadingTexts[0]);
  const [fadeStage, setFadeStage] = useState<"hidden" | "visible" | "fading">("hidden");

  useEffect(() => {
    // Typewriter effect logic
    const typeWriter = setTimeout(() => {
      if (typewriterCharIndex < typewriterTexts[typewriterIndex].length) {
        setCurrentTypewriterText((prev) => prev + typewriterTexts[typewriterIndex][typewriterCharIndex]);
        setTypewriterCharIndex((prev) => prev + 1);
      } else if (typewriterCharIndex === typewriterTexts[typewriterIndex].length) {
        setTimeout(() => {
          setCurrentTypewriterText("");
          setTypewriterCharIndex(0);
          setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length);
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(typeWriter);
  }, [typewriterCharIndex, typewriterIndex]);

  useEffect(() => {
    // Fading effect logic
    const fadeInOut = setInterval(() => {
      setFadeStage("visible");

      setTimeout(() => setFadeStage("fading"), 2000);

      setTimeout(() => {
        setCurrentFadingText((prev) => {
          const currentIndex = fadingTexts.indexOf(prev);
          const nextIndex = (currentIndex + 1) % fadingTexts.length;
          return fadingTexts[nextIndex];
        });
        setFadeStage("hidden");
      }, 3000);
    }, 4000);

    return () => clearInterval(fadeInOut);
  }, []);

  return (
    <div className="relative text-white flex flex-col items-center justify-between h-screen">
      {/* Background Image */}
      <Image
        src="/loading.svg"
        layout="fill"
        className="absolute left-0 top-0 object-cover w-full h-full"
        alt="loading"
      />

      {/* Top Section: Super Charged By Gen-AI 2.0 */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-6 sm:mt-10">
        <Image src="/pic3.svg" alt="Placeholder Icon" width={40} height={40} />
        <p className="text-lg sm:text-2xl font-bold">Powered by Forj AI 2.0</p>
      </div>

      {/* Middle Section: Typewriter Effect */}
      <div className="relative z-10 text-center px-20  space-y-28 py-6">
        <p className="text-4xl sm:text-6xl font-bold break-words leading-10">
          {currentTypewriterText}
          <span className="animate-pulse">|</span>
        </p>
        <p className="text-3xl sm:text-4xl font-semibold">BrandForj</p>
      </div>

      {/* Bottom Section: Fading Effect */}
      <div className="relative z-10 text-center px-4 pb-6 sm:pb-10 mb-10">
        <p
          className={`text-sm sm:text-base font-medium transition-opacity duration-500 ${
            fadeStage === "hidden"
              ? "opacity-0"
              : fadeStage === "visible"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {currentFadingText}
        </p>
      </div>
    </div>
  );
};

export default GenerationLoader;
