
import CustomLayout from "@/components/CustomLayout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { useCompany } from "@/contexts/CompanyContext";

const Index = () => {
  const { currentCompany } = useCompany();
  
  return (
    <CustomLayout>
      <h1 className="text-2xl font-bold tracking-tight">
        {currentCompany?.name} Dashboard
      </h1>
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
