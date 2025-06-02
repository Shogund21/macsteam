
import React from "react";
import { CompanySelector } from "@/components/company/CompanySelector";
import { UserDropdown } from "@/components/sidebar/UserDropdown";
import MobileHint from "@/components/MobileHint";
import { MobileDropdownMenu } from "@/components/navigation/MobileDropdownMenu";
import { Button } from "@/components/ui/button";
import { Plus, List, Settings, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMaintenancePage = location.pathname === '/maintenance-checks';
  const isHomePage = location.pathname === '/';

  return (
    <div className="block h-screen w-full overflow-hidden">
      {/* Mobile dropdown menu positioned at the top right */}
      <div className="fixed top-4 right-4 z-[100]">
        <MobileDropdownMenu />
      </div>
      
      {/* Mobile helper hint for first-time users */}
      <MobileHint />

      {/* Main content area with scrolling enabled */}
      <div 
        className="bg-gray-50 min-h-screen w-full overflow-y-auto"
        data-testid="mobile-content"
      >
        <div className="h-full w-full pt-16 px-3 sm:px-4">
          {/* Application header with logo and controls */}
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
            
            {/* Company selector only shown in desktop view */}
            <div className="hidden sm:flex items-center space-x-2">
              <CompanySelector />
              <UserDropdown />
            </div>
          </div>

          {/* Mobile Quick Actions - only show on home page */}
          {isHomePage && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => navigate('/maintenance-checks')}
                  className="flex flex-col items-center p-4 h-auto bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-sm">New Check</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/maintenance-checks')}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <List className="h-6 w-6 mb-2" />
                  <span className="text-sm">View History</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/analytics')}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span className="text-sm">Analytics</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Settings className="h-6 w-6 mb-2" />
                  <span className="text-sm">Settings</span>
                </Button>
              </div>
            </div>
          )}
          
          {/* Main content with fallback */}
          <div className="dashboard-content min-h-[200px]">
            {children || (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading content...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
