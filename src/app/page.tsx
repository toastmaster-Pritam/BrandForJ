import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import BgImg from "../../public/bg.png";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import ToggleButtonClient from "@/components/toggleButtonClient";

export default function HomePage() {
  return (
    <div className="relative flex flex-col h-screen">
      {/* Background Image */}
      <Image
        src={BgImg}
        alt="bgimg"
        height={100}
        width={200}
        className="absolute top-0 -left-1 w-full h-full object-cover scale-110"
      />

      <div className="flex justify-center">
        <Image
          src="/macbook.svg"
          alt="blur"
          width={700}
          height={600}
          priority
          className="rounded-xl shadow-sm absolute bottom-8 animate-slide-up"
        />
      </div>

      {/* Header */}
      <header className=" z-10 sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            {/* toggleclientbutton */}
            <ToggleButtonClient/>
            <span className="font-bold">BrandForj 2.0</span>
            <span className="sr-only">BrandForj 2.0</span>
          </Link>
         
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 bg-transparent">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <div className="flex flex-col sm:flex-row gap-6 animate-slide-left justify-center items-center">
            <Image
              src="/pic5.svg"
              alt="Placeholder Icon"
              width={36}
              height={36}
            />
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] ">
              Best Gen AI Platform for startups
            </h1>

            </div>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground animate-slide-right">
              A stunning and functional generative AI components to help you
              grow your business and impress investors
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6 animate-slide-down">
              <Button variant="default" asChild className="rounded-xl relative overflow-hidden">
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="relative z-10 py-6 md:py-0 border-t border-border/40 bg-black text-white">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
              Built on top of{" "}
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                shadcn/ui
              </Link>
              . The source code is available on{" "}
              <Link
                href="https://github.com/salimi-my/shadcn-ui-sidebar"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
        </footer> */}
    </div>
  );
}
