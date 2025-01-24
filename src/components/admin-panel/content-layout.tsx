"use client"
import { Navbar } from "@/components/admin-panel/navbar";
import Image from "next/image";
import BgImg from "../../../public/bg-rounded.png";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarToggle } from "./sidebar-toggle";
import { usePathname } from "next/navigation";


interface ContentLayoutProps {
  title1?: string;
  title2: string;
  children: React.ReactNode;
}

export function ContentLayout({
  title1,
  title2,
  children
}: ContentLayoutProps) {
  const {isOpen,toggleOpen}=useSidebar()
  const pathname=usePathname()
  const pathWithoutNavbar=["/account","/subscription","/download-generated-image"]
  const shouldHideNavbar = pathWithoutNavbar.some((path) =>
    pathname.startsWith(path)
  );
  return (
    <div className="relative h-screen overflow-y-auto px-5 overflow-x-hidden flex flex-col justify-between bg-black">
     <div>
     <div className="absolute top-14 left-12 z-50">
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      </div>

      <div className="absolute top-[1%] left-[1%] object-cover rounded-xl w-[98%] h-[98%] bg-black">
      <Image
        src={BgImg}
        alt="bgimg"
        className="h-full w-full"
        
      />
      </div>

      
      <div className="relative z-10 px-5 mt-10">
      
      {!shouldHideNavbar ? (
            <Navbar title1={title1} title2={title2} />
          ) : (
            <div className="block lg:hidden">
              <Navbar title1={title1} title2={title2} />
            </div>
          )}
      </div>
      <div className="relative z-20 px-5">{children}</div>
     </div>
      <footer className="relative z-10 w-full">
        <p className="text-center text-black py-10 border-gray-300 ">
          All Rights Reserved By BrandForj 2025
        </p>
      </footer>
    </div>
  );
}
