
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
  const [renderCount, setRenderCount] = useState(0);
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Apply visibility fixes
  useForceVisibility();
  
  // Force content visibility
  useEffect(() => {
    setIsContentVisible(true);
    
    // Force multiple re-renders to ensure display
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => {
        setIsContentVisible(true);
        setRenderCount(prev => prev + 1);
      }, i * 200));
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Error handling for the layout
  useEffect(() => {
    try {
      // Force re-render to ensure content is visible
      window.dispatchEvent(new Event('resize'));
    } catch (err) {
      setLayoutError(handleLayoutError(err));
    }
  }, [renderCount]);

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
