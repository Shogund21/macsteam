
import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCompany } from "@/contexts/CompanyContext";
import { useToast } from "@/hooks/use-toast";

export const CompanyRouteGuard = () => {
  const { currentCompany, isLoading } = useCompany();
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !currentCompany) {
      toast({
        title: "Company Required",
        description: "Please select a company to continue",
        variant: "destructive"
      });
    }
  }, [currentCompany, isLoading, toast]);

  // Don't redirect while still loading to prevent flash
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If no company is selected, redirect to landing page
  if (!currentCompany) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Company is selected, allow access to protected routes
  return <Outlet />;
};
