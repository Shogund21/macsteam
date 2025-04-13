
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
        <Sidebar />
        <SidebarInset className="bg-gray-50 p-3 sm:p-4 md:p-6 w-full overflow-y-auto">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
