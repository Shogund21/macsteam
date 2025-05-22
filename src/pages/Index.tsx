
import { useEffect, useState, useCallback } from "react";
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { FilterChangesOverview } from "@/components/dashboard/FilterChangesOverview";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [renderAttempt, setRenderAttempt] = useState(0);

  // Force content to render with multiple attempts
  const forceRender = useCallback(() => {
    setContentVisible(true);
    window.dispatchEvent(new Event('resize'));
    
    // Force all dashboard content to be visible
    document.querySelectorAll('.dashboard-content, .overflow-container').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
  }, []);

  // Force content visibility and handle errors with multiple attempts
  useEffect(() => {
    try {
      // Set content as visible immediately
      setContentVisible(true);
      forceRender();
      
      // Schedule multiple re-render attempts
      const timers = [];
      for (let i = 1; i <= 5; i++) {
        timers.push(setTimeout(() => {
          setIsLoading(false);
          setContentVisible(true);
          forceRender();
          setRenderAttempt(prev => prev + 1);
        }, i * 200)); // Try at 200ms, 400ms, 600ms, 800ms, 1000ms
      }
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } catch (error) {
      console.error("Error in Index component:", error);
      setHasError(true);
      setIsLoading(false);
      toast({
        title: "Error loading dashboard",
        description: "There was a problem loading the dashboard content. Please try refreshing.",
        variant: "destructive",
      });
    }
  }, [forceRender]);

  // Fix visibility issues if content height is zero (another attempt)
  useEffect(() => {
    const checkContentHeight = () => {
      const dashboardContent = document.querySelector('.dashboard-content');
      if (dashboardContent && dashboardContent.clientHeight === 0) {
        console.log('Dashboard content has zero height. Forcing rerender.');
        forceRender();
        setRenderAttempt(prev => prev + 1);
      }
    };
    
    // Check after a delay
    const timer = setTimeout(checkContentHeight, 500);
    return () => clearTimeout(timer);
  }, [forceRender, renderAttempt]);

  return (
    <CustomLayout>
      <div className="dashboard-content min-h-[400px] block visible" style={{ display: "block", visibility: "visible", opacity: 1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        {/* Simple content that always shows regardless of data loading state */}
        <div className="my-4 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-medium">Welcome to AssetGuardian</h2>
          <p className="text-gray-500">Your equipment management platform</p>
        </div>
        
        {isLoading ? (
          <div className="my-6 animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : hasError ? (
          <div className="my-6 bg-red-50 p-4 rounded-md border border-red-100">
            <p className="text-center text-red-800">
              Unable to load dashboard data. Please try again later.
            </p>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ display: "block", visibility: "visible", opacity: 1 }}>
            <div className="my-6">
              <Stats />
            </div>
            <div className="space-y-4 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <RecentActivities />
                </div>
                <div>
                  <FilterChangesOverview />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <EquipmentOverview />
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default Index;
