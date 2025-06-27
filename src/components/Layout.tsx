
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { useViewportHeight } from "@/components/layout/LayoutVisibilityUtils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    
    // Force visibility on mount
    const forceVisibility = () => {
      document.querySelectorAll('#root, #root > *, body').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    forceVisibility();
    setTimeout(forceVisibility, 100);
  }, []);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div style={{ 
        display: 'block', 
        visibility: 'visible', 
        padding: '20px', 
        minHeight: '100vh',
        backgroundColor: 'white'
      }}>
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h2>AssetGuardian</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  // Use different layout approach for mobile vs desktop
  if (isMobile) {
    return (
      <div style={{ display: 'block', visibility: 'visible', minHeight: '100vh' }}>
        <MobileLayout>
          {children}
        </MobileLayout>
      </div>
    );
  }

  return (
    <div style={{ display: 'block', visibility: 'visible', minHeight: '100vh' }}>
      <SidebarProvider defaultOpen={true}>
        <DesktopLayout>
          {children}
        </DesktopLayout>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
