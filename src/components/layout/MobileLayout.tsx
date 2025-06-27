
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
    <div 
      style={{ 
        display: 'block', 
        width: '100%', 
        minHeight: '100vh',
        visibility: 'visible',
        backgroundColor: '#f9fafb'
      }}
    >
      {/* Mobile dropdown menu positioned at the top right */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '16px', 
          right: '16px', 
          zIndex: 100 
        }}
      >
        <MobileDropdownMenu />
      </div>
      
      {/* Mobile helper hint for first-time users */}
      <MobileHint />

      {/* Main content area with proper scrolling */}
      <div 
        style={{
          backgroundColor: '#f9fafb',
          width: '100%',
          minHeight: '100vh',
          paddingTop: '64px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingBottom: '32px'
        }}
        data-testid="mobile-content"
      >
        {/* Application header with logo and controls */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/lovable-uploads/91b3768c-9bf7-4a1c-b2be-aea61a3ff3be.png" 
              alt="AssetGuardian Logo" 
              style={{ height: '32px', width: '32px', marginRight: '12px' }}
            />
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                AssetGuardian
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                by Shogunai LLC
              </p>
            </div>
          </div>
          
          {/* Company selector only shown in desktop view */}
          <div style={{ display: 'none' }}>
            <CompanySelector />
            <UserDropdown />
          </div>
        </div>

        {/* Mobile Quick Actions - only show on home page */}
        {isHomePage && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
        
        {/* Main content with proper spacing for mobile */}
        <div 
          className="dashboard-content"
          style={{ 
            display: 'block',
            visibility: 'visible',
            minHeight: '200px'
          }}
        >
          {children || (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '256px' 
            }}>
              <p style={{ color: '#6b7280' }}>Loading content...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
