
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";

const Index = () => {
  return (
    <CustomLayout>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <div className="my-6">
        <Stats />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <EquipmentOverview />
        <RecentActivities />
      </div>
    </CustomLayout>
  );
};

export default Index;
