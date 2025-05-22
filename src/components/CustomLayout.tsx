
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

  // Force content visibility and proper rendering with multiple attempts
  useEffect(() => {
    try {
      // Set content as visible immediately
      setIsVisible(true);
      
      // Multiple attempts to ensure content visibility
      const timers = [];
      
      // First attempt immediately
      const ensureVisibility = () => {
        // Force visibility on all main containers
        const containers = document.querySelectorAll('.dashboard-content, .overflow-container, [data-radix-sidebar-inset], [data-radix-sidebar-content]');
        containers.forEach(container => {
          if (container instanceof HTMLElement) {
            container.style.display = 'block';
            container.style.visibility = 'visible';
            container.style.opacity = '1';
          }
        });
        
        // Force resize to trigger responsive adjustments
        window.dispatchEvent(new Event('resize'));
      };
      
      // Run visibility fix immediately
      ensureVisibility();
      
      // And schedule multiple attempts
      for (let i = 1; i <= 5; i++) {
        timers.push(setTimeout(() => {
          setIsVisible(true);
          ensureVisibility();
        }, i * 200)); // Attempts at 200ms, 400ms, 600ms, 800ms, 1000ms
      }
      
      // Clean up timers
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

  // Show error state if layout fails
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

  return (
    <>
      <Layout>
        <div 
          className="overflow-container w-full min-h-[200px] block visible" 
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
    </>
  );
};

export default CustomLayout;
