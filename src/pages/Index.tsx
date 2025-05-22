
import { useEffect, useState } from "react";
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { FilterChangesOverview } from "@/components/dashboard/FilterChangesOverview";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Force a re-render after component mounts to ensure all content is displayed
  useEffect(() => {
    try {
      const timer1 = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        setIsLoading(false);
      }, 100);
      
      // Additional safety check
      const timer2 = setTimeout(() => {
        if (document.querySelector('.dashboard-content')?.clientHeight === 0) {
          window.dispatchEvent(new Event('resize'));
          console.log('Force rerender due to zero height');
        }
      }, 500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
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
  }, []);

  return (
    <CustomLayout>
      <div className="dashboard-content min-h-[400px] block">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
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
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
              >
                Refresh Page
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </CustomLayout>
  );
};

export default Index;
