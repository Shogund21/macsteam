
import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileHint from "./MobileHint";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanySelector } from "./company/CompanySelector";
import { UserDropdown } from "./sidebar/UserDropdown"; 
import { toast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [isContentVisible, setIsContentVisible] = useState(true); // Start with visible content
  const [layoutError, setLayoutError] = useState<Error | null>(null);
  
  // Fix for mobile Safari: Handle viewport height properly
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set viewport height immediately and on window resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Force content visibility
    setIsContentVisible(true);
    
    // Force multiple re-renders to ensure display
    setTimeout(setViewportHeight, 100);
    setTimeout(setViewportHeight, 300);
    setTimeout(setViewportHeight, 500);
    setTimeout(() => {
      setIsContentVisible(true);
      window.dispatchEvent(new Event('resize'));
    }, 800);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  // Error handling for the layout
  useEffect(() => {
    try {
      // Force re-render to ensure content is visible
      window.dispatchEvent(new Event('resize'));
    } catch (err) {
      console.error("Layout render error:", err);
      setLayoutError(err instanceof Error ? err : new Error("Unknown layout error"));
      toast({
        title: "Display Error",
        description: "There was a problem loading the page. Please try refreshing.",
        variant: "destructive"
      });
    }
  }, []);

  // Show fallback UI if layout fails
  if (layoutError) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">There was an error loading the application layout.</p>
        <Button onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div 
        className="flex h-screen w-full overflow-hidden flex-col md:flex-row visible" 
        style={{ height: 'calc(var(--vh, 1vh) * 100)', minHeight: 'calc(var(--vh, 1vh) * 100)' }}
      >
        {/* Mobile sidebar toggle button - only visible on mobile */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-[7500]">
            <SidebarTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-white/80 backdrop-blur-sm shadow-sm"
                aria-label="Toggle Menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SidebarTrigger>
          </div>
        )}
        
        {/* Mobile helper hint for first-time users */}
        {isMobile && <MobileHint />}
        
        {/* Sidebar with fixed width */}
        <Sidebar />

        {/* Main content with proper margin to prevent overlap */}
        <SidebarInset 
          className="flex-1 bg-gray-50 min-h-screen w-full overflow-y-auto display-block visible" 
          style={{ 
            height: 'calc(var(--vh, 1vh) * 100)', 
            minHeight: 'calc(var(--vh, 1vh) * 100)',
            visibility: "visible",
            display: "block"
          }}
        >
          <div className="h-full w-full visible" style={{ display: "block" }}>
            <div className="w-full p-3 sm:p-4 md:p-6 visible">
              {/* Application header with logo, name, and mobile-friendly controls */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center">
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
                
                {/* Add company selector and user dropdown in header for mobile */}
                {isMobile && (
                  <div className="flex items-center space-x-2">
                    <CompanySelector />
                    <UserDropdown />
                  </div>
                )}
              </div>
              
              {/* Render children with fallback */}
              <div className="min-h-[200px] block visible" style={{ display: "block", visibility: "visible" }}>
                {children || (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading content...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
