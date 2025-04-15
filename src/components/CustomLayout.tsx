
import React from "react";
import Layout from "@/components/Layout";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  return (
    <Layout>
      <div className="overflow-container">
        {children}
      </div>
    </Layout>
  );
};

export default CustomLayout;
