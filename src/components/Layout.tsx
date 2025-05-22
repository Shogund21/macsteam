
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { LayoutErrorBoundary, handleLayoutError } from "@/components/layout/LayoutErrorBoundary";
import { useViewportHeight, useForceVisibility } from "@/components/layout/LayoutVisibilityUtils";
import { toast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [layoutError, setLayoutError] = useState<Error | null>(null);
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Apply visibility fixes
  useForceVisibility();
  
  // Force content visibility and handle errors
  useEffect(() => {
    try {
      // Force critical elements to be visible
      document.querySelectorAll(
        '#root, #root > div, .dashboard-content, [data-radix-sidebar-content], [data-radix-sidebar-inset]'
      ).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
      
      // Force desktop flex layouts
      if (!isMobile) {
        document.querySelectorAll('.flex, .flex-1').forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'flex';
          }
        });
      }
      
      // Force browser repaint
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    } catch (err) {
      console.error("Layout initialization error:", err);
      setLayoutError(handleLayoutError(err));
      toast({
        title: "Layout Error",
        description: "There was an issue with the layout. We'll try to recover automatically.",
        variant: "destructive"
      });
    }
  }, [isMobile]);

  // Show fallback UI if layout fails
  if (layoutError) {
    return <LayoutErrorBoundary layoutError={layoutError} />;
  }
  
  // Use different layout approach for mobile vs desktop
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      {isMobile ? (
        <MobileLayout>
          {children}
        </MobileLayout>
      ) : (
        <DesktopLayout>
          {children}
        </DesktopLayout>
      )}
    </SidebarProvider>
  );
};

export default Layout;
