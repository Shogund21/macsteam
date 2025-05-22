
import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { CompanySelector } from "@/components/company/CompanySelector";
import { UserDropdown } from "@/components/sidebar/UserDropdown";
import MobileHint from "@/components/MobileHint";
import Sidebar from "@/components/Sidebar";

interface MobileLayoutProps {
  children: React.ReactNode;
  isContentVisible: boolean;
}

export const MobileLayout = ({ children, isContentVisible }: MobileLayoutProps) => {
  return (
    <div 
      className="block h-screen w-full overflow-auto visible" 
      style={{ 
        height: 'calc(var(--vh, 1vh) * 100)', 
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        display: "block",
        visibility: "visible",
        opacity: 1
      }}
    >
      {/* Mobile sidebar toggle button */}
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
      
      {/* Mobile helper hint for first-time users */}
      <MobileHint />
      
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main content area */}
      <div 
        className="bg-gray-50 min-h-screen w-full overflow-y-auto display-block visible" 
        style={{ 
          height: 'calc(var(--vh, 1vh) * 100)', 
          minHeight: 'calc(var(--vh, 1vh) * 100)',
          visibility: "visible",
          display: "block",
          opacity: 1,
          paddingTop: "1rem"
        }}
        data-testid="mobile-content"
      >
        <div className="h-full w-full visible" style={{ display: "block", visibility: "visible" }}>
          <div className="w-full p-3 sm:p-4 visible" style={{ display: "block", visibility: "visible" }}>
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
              <div className="flex items-center space-x-2">
                <CompanySelector />
                <UserDropdown />
              </div>
            </div>
            
            {/* Render children with fallback */}
            <div className="min-h-[200px] block visible" style={{ display: "block", visibility: "visible", opacity: 1 }}>
              {isContentVisible && children ? children : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Loading content...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
