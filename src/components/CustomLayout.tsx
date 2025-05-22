
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  // Force visibility on mount
  useEffect(() => {
    const forceVisible = () => {
      document.querySelectorAll('.dashboard-content, .overflow-container').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Apply multiple times to ensure content appears
    forceVisible();
    const timers = [100, 300, 500].map(delay => setTimeout(forceVisible, delay));
    
    return () => timers.forEach(clearTimeout);
  }, []);
  
  return (
    <>
      <Layout>
        <div className="dashboard-content w-full min-h-[200px]">
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
