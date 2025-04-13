
// Important: This is a read-only file, so we can only view it but not modify it directly.
// Let's create a custom layout component:

// src/components/CustomLayout.tsx
import React from "react";
import { SidebarWrapper } from "./SidebarWrapper";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
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
