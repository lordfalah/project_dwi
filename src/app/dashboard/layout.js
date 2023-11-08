"use client";

import SideNav from "@/component/dashboard/SideNav";
import { NavigateOpen } from "@/utils/hooks/useOpenNav";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="m-0 font-sans text-base antialiased font-normal leading-default text-slate-500 relative before:fixed before:-z-50 before:inset-0 before:bg-gray-100 after:absolute after:top-0 after:w-full after:-z-10 after:bg-blue-500 after:h-72">
      <NavigateOpen>
        <SideNav />
        <div className="block xl:flex xl:gap-x-4">
          <div className="xl:max-w-[280px] w-full"></div>
          {children}
        </div>
      </NavigateOpen>
    </div>
  );
};

export default DashboardLayout;
