"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="w-40 mx-auto" onValueChange={onSwitch}>
    <TabsList className="py-6 px-2">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
const PricingCard = ({
  isYearly,
  title,
  monthlyPrice=0,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive
}: PricingCardProps) => (
  <Card
  className={cn(
    `relative max-w-full sm:w-80 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between hover:scale-105 transition-transform ease-out ${
      exclusive
        ? "bg-gradient-to-b from-purple-400 to-purple-700 text-white"
        : "bg-white"
    }`,
    {
      // Wrapper gradient border for popular cards
      "border border-gray-300": !popular,
    }
  )}
>
  {popular && (
    <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 animate-gradient">
      <div className="h-full w-full bg-white rounded-lg"></div>
    </div>
  )}
    <div className="p-6 z-10">
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-4 right-4 bg-orange-400 text-white text-xs font-bold py-1 px-2 rounded-full">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div
        className={`text-start text-gray-700 ${
          exclusive ? "text-zinc-100" : "text-zinc-700"
        }`}
      >
        <div className="flex justify-start items-center mb-4">
          <Image src={"/price-icon1.svg"} alt="price-icon" width={48} height={48} />
        </div>
        <h3 className={`text-xl font-semibold`}>{title}</h3>
        <div className="flex items-center justify-start gap-2 mt-2">
          <h3 className="text-4xl font-bold">
            {isYearly && yearlyPrice ? `$${yearlyPrice}` : `$${monthlyPrice}`}
          </h3>
          <div className="flex flex-col">
          <p className={`text-sm  line-through `}>
            {isYearly && yearlyPrice ? `$${monthlyPrice * 12}` : `$${monthlyPrice*1.3}`}
          </p>
          
          <p>{isYearly?'/per year':'/per month'}</p>
          </div>
        </div>
        <p className={`text-sm`}>{description}</p>
      </div>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <CheckItem key={feature} text={feature} exclusive={!!exclusive} />
          </li>
        ))}
      </ul>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 z-50">
      <button className={`w-full ${exclusive?'bg-white text-black':'bg-gradient-to-b from-purple-500 to-purple-700 text-white'}  py-3 rounded-lg text-sm font-semibold shadow-md hover:opacity-90 transition`}>
        {actionLabel}
      </button>
    </div>
  </Card>
);

const CheckItem = ({
  text,
  exclusive
}: {
  text: string;
  exclusive: boolean;
}) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto"  fill={exclusive?'#fff':'#a855f7'} color={exclusive?'#a855f7':'#fff'}/>
    <p
      className={`pt-0.5 ${
        exclusive ? "text-zinc-100" : "text-zinc-700"
      }   text-sm`}
    >
      {text}
    </p>
  </div>
);

export default function Page() {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const sidebar = useStore(useSidebar, (x) => x);
  

  const getOpenState = sidebar?.getOpenState || (() => false);

  const plans = [
    {
      title: "Basic",
      monthlyPrice: 10,
      yearlyPrice: 100,
      description: "For solo entrepreneurs",
      features: [
        "Generate Upto 35 Page",
        "High Quality",
        "Brand Deck Ai",
        "One Pager Ai "
      ],
      actionLabel: "Start 7-day free trial"
    },
    {
      title: "Advanced",
      monthlyPrice: 25,
      yearlyPrice: 250,
      description: "As your business scales",
      features: [
        "Generate Upto 60 Page",
        "Enhanced Quality Export  ",
        "AI-Generated Logo (20 variations)",
        "Color & Font Customization",
        "AI-Generated Brand Book ",
        "AI-Generated Brand Deck",
        "AI-Generated One Pager ",
        "AI-Generated Brand Infographics"


      ],
      actionLabel: "Start 7-day free trial",
      popular: true
    },
    {
      title: "Plus",
      monthlyPrice: 59,
      yearlyPrice: 350,
      description: "For more complex businesses",
      features: [
        "Generate Upto 100 Page",
        "Superior Quality Export  ",
        "AI-Generated Logo (52 variations)",
        "Color & Font Customization",
        "AI-Generated Brand Book ",
        "AI-Generated Brand Deck",
        "AI-Generated One Pager ",
        "AI-Generated Brand Infographics"
      ],
      actionLabel: "Start 7-day free trial",
      exclusive: true
    }
  ];
  return (
    <ContentLayout title2="">
      {/* Footer Section */}
      <div className={`mt-12 text-gray-400 flex flex-col-reverse sm:flex-row justify-start items-center gap-3 ${getOpenState()?'mx-10':'mx-32'}`}>
          <p className="text-2xl font-bold">Powered by Forj AI 2.0</p>
          <Image
            src="/pic2.svg" // Placeholder for the AI icon
            alt="Placeholder Icon"
            width={50}
            height={50}
          />
        </div>
      <div className="py-8">
        <PricingSwitch onSwitch={togglePricingPeriod} />
        <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8 ">
          {plans.map((plan) => {
            return (
              <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
            );
          })}
        </section>
      </div>
    </ContentLayout>
  );
}
