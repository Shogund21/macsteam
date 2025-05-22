
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [layoutError, setLayoutError] = useState<Error | null>(null);

  // Critical rendering fix - always show content
  useEffect(() => {
    try {
      // Immediate visibility
      setIsVisible(true);
      
      const forceVisibility = () => {
        // Force all content to be visible
        document.querySelectorAll('.dashboard-content, .overflow-container, [data-radix-sidebar-inset], [data-radix-sidebar-content], #root > div').forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            if (el.classList.contains('dashboard-content')) {
              el.style.minHeight = '400px';
            }
          }
        });
        
        // Force layout recalculation
        window.dispatchEvent(new Event('resize'));
      };
      
      // Run immediately 
      forceVisibility();
      
      // And multiple times after short delays
      const timers = [];
      for (let i = 1; i <= 8; i++) {
        timers.push(setTimeout(() => {
          forceVisibility();
          setIsVisible(true);
        }, i * 150)); // More frequent attempts with 150ms intervals
      }
      
      // Clean up
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } catch (error) {
      console.error("CustomLayout render error:", error);
      setLayoutError(error instanceof Error ? error : new Error("Unknown layout error"));
      toast({
        title: "Layout Error",
        description: "There was a problem displaying the content. Please refresh the page.",
        variant: "destructive"
      });
    }
  }, []);

  // Error fallback
  if (layoutError) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Layout Error</h2>
        <p className="mb-4">There was an error displaying the content. Please try refreshing the page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Page
        </button>
        <Toaster />
      </div>
    );
  }

  // Simple block-based layout that works even if React rendering is struggling
  return (
    <div className="block visible w-full" style={{ display: "block", visibility: "visible" }}>
      <Layout>
        <div 
          className="dashboard-content w-full min-h-[400px] block visible" 
          style={{ 
            display: "block", 
            visibility: "visible",
            opacity: 1
          }}
        >
          {children || (
            <div className="p-4 text-center">
              <p className="text-gray-500">Loading content...</p>
            </div>
          )}
        </div>
      </Layout>
      <Toaster />
    </div>
  );
};

export default CustomLayout;
