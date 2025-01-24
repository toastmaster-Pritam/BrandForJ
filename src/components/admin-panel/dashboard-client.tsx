"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import DynamicChartCard from "@/components/card";
import Image from "next/image";
import { Suspense } from "react";

const DashboardClient = ({username}:{username:string}) => {
    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;

  return (
    <ContentLayout title1="Welcome" title2={username}>
    <div className="mt-10">
      <div className="flex gap-5">
        {/* card1 */}
        <div className="relative w-1/2 h-[280px] shadow-lg overflow-hidden p-4 rounded-lg animate-slide-left">
          <Image
            src={"/card1.svg"}
            width={200}
            height={100}
            alt="card1"
            className="absolute top-0 -left-1 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-y-0 left-0 w-1/2 flex flex-col justify-center p-6">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
              Create Brand Book With Our Gen-AI
            </h1>
            <p className="text-sm text-white/80">
              Forj AI 2.0 Lets You Create World Class Brand Book Within Min &
              Ready To Share
            </p>
          </div>
        </div>

        {/* card2 */}
        <div className="relative w-1/2 h-[280px] shadow-lg overflow-hidden p-4 rounded-lg animate-slide-right">
          <Image
            src={"/card2.svg"}
            width={200}
            height={100}
            alt="card2"
            className="absolute top-0 -left-1 w-full h-full object-cover scale-110"
          />
          <div className="flex flex-col justify-center p-6">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2 z-50 w-2/3">
              Brand Deck Crafted Thats Suites Your Brand
            </h1>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-10 flex-row-reverse">
        <div className="relative w-2/3 shadow-lg overflow-hidden p-4 rounded-lg animate-slide-up">
          <Image
            src={"/card4.svg"}
            width={200}
            height={100}
            alt="card4"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-56 flex flex-col justify-center p-6">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
              Create A One Pager For Your Brand
            </h1>
          </div>
        </div>

        <DynamicChartCard />
      </div>
    </div>
  </ContentLayout>
  )
}

export default DashboardClient