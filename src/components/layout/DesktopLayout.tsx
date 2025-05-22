
import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

interface DesktopLayoutProps {
  children: React.ReactNode;
  isContentVisible: boolean;
}

export const DesktopLayout = ({ children, isContentVisible }: DesktopLayoutProps) => {
  return (
    <div 
      className="flex h-screen w-full overflow-hidden visible" 
      style={{ 
        height: 'calc(var(--vh, 1vh) * 100)', 
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        display: "flex",
        visibility: "visible",
        opacity: 1
      }}
    >
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main content with proper margin to prevent overlap */}
      <SidebarInset 
        className="flex-1 bg-gray-50 min-h-screen w-full overflow-y-auto display-block visible" 
        style={{ 
          height: 'calc(var(--vh, 1vh) * 100)', 
          minHeight: 'calc(var(--vh, 1vh) * 100)',
          visibility: "visible",
          display: "block",
          opacity: 1
        }}
        data-testid="sidebar-inset"
      >
        <div className="h-full w-full visible" style={{ display: "block", visibility: "visible" }}>
          <div className="w-full p-3 sm:p-4 md:p-6 visible" style={{ display: "block", visibility: "visible" }}>
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
      </SidebarInset>
    </div>
  );
};
