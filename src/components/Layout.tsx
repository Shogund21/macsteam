
import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
        {/* Mobile sidebar toggle button - only visible on mobile */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-50">
            <SidebarTrigger />
          </div>
        )}
        
        {/* Sidebar with fixed width - hidden on mobile initially but can be opened */}
        <Sidebar />

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
