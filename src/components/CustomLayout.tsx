
import React from "react";
import SidebarWrapper from "./SidebarWrapper";

interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarWrapper />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default CustomLayout;
