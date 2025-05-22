
import React from "react";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <div className="block visible w-full" style={{ display: "block", visibility: "visible" }}>
      <Layout>
        <div 
          className="dashboard-content w-full min-h-[200px] block visible" 
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
