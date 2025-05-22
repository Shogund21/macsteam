
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { LayoutErrorBoundary, handleLayoutError } from "@/components/layout/LayoutErrorBoundary";
import { useViewportHeight, useForceVisibility } from "@/components/layout/LayoutVisibilityUtils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [isContentVisible, setIsContentVisible] = useState(true); 
  const [layoutError, setLayoutError] = useState<Error | null>(null);
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Apply visibility fixes
  useForceVisibility();
  
  // Force content visibility
  useEffect(() => {
    // Immediate render
    setIsContentVisible(true);
    
    // Force critical elements to be visible
    const forceElementsVisible = () => {
      document.querySelectorAll(
        '#root, #root > div, .dashboard-content, [data-radix-sidebar-root], [data-radix-sidebar-content], [data-radix-sidebar-inset]'
      ).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Apply multiple times to ensure visibility
    forceElementsVisible();
    const timers = [100, 300, 500, 1000].map(delay => 
      setTimeout(forceElementsVisible, delay)
    );
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Error handling for the layout
  useEffect(() => {
    try {
      // Force re-render to ensure content is visible
      window.dispatchEvent(new Event('resize'));
      
      // Emergency browser repaint
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
      
    } catch (err) {
      setLayoutError(handleLayoutError(err));
    }
  }, []);

  // Show fallback UI if layout fails
  if (layoutError) {
    return <LayoutErrorBoundary layoutError={layoutError} />;
  }
  
  // Use different layout approach for mobile vs desktop
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      {isMobile ? (
        <MobileLayout isContentVisible={isContentVisible}>
          {children}
        </MobileLayout>
      ) : (
        <DesktopLayout isContentVisible={isContentVisible}>
          {children}
        </DesktopLayout>
      )}
    </SidebarProvider>
  );
};

export default Layout;
