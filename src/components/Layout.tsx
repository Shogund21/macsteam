
import React from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarWrapper } from "@/components/SidebarWrapper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarWrapper />
        </Sidebar>
        <SidebarInset className="bg-gray-50 p-6">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
