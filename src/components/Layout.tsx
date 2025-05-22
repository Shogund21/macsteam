
import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { DesktopLayout } from "@/components/layout/DesktopLayout";
import { useViewportHeight } from "@/components/layout/LayoutVisibilityUtils";
import { toast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  // Apply viewport height adjustment
  useViewportHeight();
  
  // Force content visibility on mount
  useEffect(() => {
    try {
      // Set a simpler initial layout immediately
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement.childElementCount <= 1) {
        rootElement.innerHTML = `
          <div style="display:block;min-height:200px;padding:20px;text-align:center">
            <p>Loading AssetGuardian...</p>
          </div>
        `;
      }
      
      // Simple visibility fix for critical elements
      document.querySelectorAll('#root, .dashboard-content').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    } catch (err) {
      console.error("Layout initialization error:", err);
      toast({
        title: "Layout Error",
        description: "There was an issue with the layout. We'll try to recover automatically.",
        variant: "destructive"
      });
    }
  }, []);
  
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
