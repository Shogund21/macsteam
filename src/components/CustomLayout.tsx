
import React from "react";
import Layout from "@/components/Layout";

interface CustomLayoutProps {
  children: React.ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default CustomLayout;
