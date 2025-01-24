"use client";

import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  

  const getOpenState = sidebar?.getOpenState || (() => false);
  const settings = sidebar?.settings || { disabled: false };
  const pathname = usePathname();

  // Conditional rendering for paths starting with '/auth'
  if (pathname.startsWith('/sign-up') || pathname.startsWith('/sign-in')) {
    return <main>{children}</main>
  }

  // Default layout for other paths
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        {children}
      </main>
    </>
  )
}
