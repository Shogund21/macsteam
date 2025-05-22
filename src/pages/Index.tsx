
import { useEffect, useState } from "react";
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { FilterChangesOverview } from "@/components/dashboard/FilterChangesOverview";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Force content to render and stop loading state
  useEffect(() => {
    // Short timeout to ensure components have time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <CustomLayout>
      <div className="dashboard-content min-h-[200px]">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        {/* Simple welcome panel that always shows */}
        <div className="my-4 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-medium">Welcome to AssetGuardian</h2>
          <p className="text-gray-500">Your equipment management platform</p>
        </div>
        
        {isLoading ? (
          <div className="my-6 animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div>
            <div className="my-6">
              <Stats />
            </div>
            
            {/* Use simple layout for mobile */}
            {isMobile ? (
              <div className="space-y-4">
                <div className="mb-4">
                  <RecentActivities />
                </div>
                <div className="mb-4">
                  <FilterChangesOverview />
                </div>
                <div className="mb-4">
                  <EquipmentOverview />
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <RecentActivities />
                  </div>
                  <div>
                    <FilterChangesOverview />
                  </div>
                </div>
                <div>
                  <EquipmentOverview />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default Index;
