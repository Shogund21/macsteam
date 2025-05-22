
import React, { useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHint from "./MobileHint";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  // Fix for mobile Safari: Handle viewport height properly
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        {/* Mobile sidebar toggle button and hint - only visible on mobile */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-50">
            <SidebarTrigger />
          </div>
        )}
        
        {/* Mobile helper hint for first-time users */}
        {isMobile && <MobileHint />}
        
        {/* Sidebar with fixed width */}
        <Sidebar />

        {/* Main content with proper margin to prevent overlap */}
        <SidebarInset className="flex-1 bg-gray-50 h-screen overflow-hidden ml-0 md:ml-52" 
                     style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
          <ScrollArea className="h-full">
            <div className="w-full max-w-full p-3 sm:p-4 md:p-6">
              {/* Application header with logo and name */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                <img 
                  src="/lovable-uploads/91b3768c-9bf7-4a1c-b2be-aea61a3ff3be.png" 
                  alt="AssetGuardian Logo" 
                  className="h-8 w-8 mr-3" 
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AssetGuardian</h1>
                  <p className="text-sm text-gray-500">by Shogunai LLC</p>
                </div>
              </div>
              {children}
            </div>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
