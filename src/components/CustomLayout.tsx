
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
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Layout>
        <div className="overflow-container w-full min-h-[200px] block visible">
          {children}
        </div>
      </Layout>
      <Toaster />
    </>
  );
};

export default CustomLayout;
