
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
import React from "react";
import { fetchFiles } from "../actions/fetchFiles";
import RecentActivity from "@/components/admin-panel/recent-activity";
const page = async() => {

  const {imageUrls} = await fetchFiles();

  console.log("file response",imageUrls)


  return (
    <ContentLayout title2="Files- Your Content">
      <div className="text-black mt-8 flex flex-col gap-4">
        <div className="w-full h-32 bg-gradient-to-b from-[#6A78FF] to-[#3EA8EF] flex justify-center items-center rounded-lg shadow-lg gap-3">
          <Image src={"/pic3.svg"} alt="pic3" width={40} height={40} />
          <h1 className="text-3xl font-semibold text-white">
            Access All Your Generated Content & History in One Place!
          </h1>
          <Image src={"/book.svg"} alt="book" width={82} height={82} />
        </div>
        {/* Main Container */}
        <div className=" px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent activity :
        </h2>
        <RecentActivity imageUrls={imageUrls}/>
        </div>
      </div>
    </ContentLayout>
  );
};

export default page;
