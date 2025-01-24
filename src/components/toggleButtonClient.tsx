"use client";
import React from "react";
import { SidebarToggle } from "./admin-panel/sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { SheetMenu } from "./admin-panel/sheet-menu";

const ToggleButtonClient = () => {
  const { isOpen, toggleOpen } = useSidebar();
  return <div className="mr-2">
    <div className="mt-7 -ml-2 lg:mt-0 lg:ml-0">
    <SheetMenu/>
    </div>
    <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
  </div>
};

export default ToggleButtonClient;
