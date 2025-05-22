
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  // Force content visibility and proper rendering
  useEffect(() => {
    // Ensure component is rendered and visible
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      
      // Force visibility on all main containers
      const containers = document.querySelectorAll('.dashboard-content, .overflow-container');
      containers.forEach(container => {
        if (container instanceof HTMLElement) {
          container.style.display = 'block';
          container.style.visibility = 'visible';
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Layout>
        <div className="overflow-container w-full min-h-[200px] block visible" style={{ display: "block", visibility: "visible" }}>
          {children || (
            <div className="p-4">
              <p className="text-center text-gray-500">Loading content...</p>
            </div>
          )}
        </div>
      </Layout>
      <Toaster />
    </>
  );
};

export default CustomLayout;
