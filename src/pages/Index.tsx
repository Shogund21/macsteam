
import { useEffect, useState } from "react";
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { FilterChangesOverview } from "@/components/dashboard/FilterChangesOverview";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  // Force content to render
  useEffect(() => {
    // Ensure content is visible on first render
    document.querySelectorAll('.dashboard-content, .overflow-container').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
    
    setIsLoading(false);
  }, []);

  return (
    <CustomLayout>
      <div className="dashboard-content min-h-[200px]" style={{ display: "block", visibility: "visible", opacity: 1 }}>
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
          <div style={{ display: "block", visibility: "visible", opacity: 1 }}>
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
