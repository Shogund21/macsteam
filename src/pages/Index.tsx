
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { FilterChangesOverview } from "@/components/dashboard/FilterChangesOverview";
import { useEffect } from "react";

const Index = () => {
  // Force a re-render after component mounts to ensure all content is displayed
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CustomLayout>
      <div className="dashboard-content">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
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
    </CustomLayout>
  );
};

export default Index;
