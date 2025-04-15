
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar with fixed width */}
        <div className={`${isMobile ? 'w-0' : 'w-56'} shrink-0 transition-all duration-300`}>
          <Sidebar />
        </div>

        {/* Main content takes remaining space */}
        <SidebarInset className="flex-1 bg-gray-50 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="w-full max-w-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
