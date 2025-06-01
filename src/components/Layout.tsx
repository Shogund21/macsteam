
import React, { useEffect } from "react";
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
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Force reflow on device type change to avoid layout issues
  useEffect(() => {
    // Small timeout to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Force a reflow by accessing offsetHeight
      document.body.offsetHeight;
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [isMobile]);
  
  // Use different layout approach for mobile vs desktop
  // Only wrap desktop layout with SidebarProvider
  if (isMobile) {
    return (
      <MobileLayout>
        {children}
      </MobileLayout>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <DesktopLayout>
        {children}
      </DesktopLayout>
    </SidebarProvider>
  );
};

export default Layout;
