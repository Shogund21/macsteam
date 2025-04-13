
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar with fixed width */}
        <div className="w-56 shrink-0">
          <Sidebar />
        </div>

        {/* Main content takes remaining space */}
        <SidebarInset className="flex-1 bg-gray-50 overflow-y-auto p-3 sm:p-4 md:p-6">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
