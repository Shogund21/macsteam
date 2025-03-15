
import Layout from "@/components/Layout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { Button } from "@/components/ui/button";
import { Plus, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Dashboard
            </h1>
            <p className="text-gray-700 mt-2">
              Welcome to Shogunai's AssetGuardian Facilities Maintenance System
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => navigate("/print")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white shadow-md hover:shadow-lg transition-all"
            >
              <Printer className="mr-2 h-4 w-4" /> Print Lists
            </Button>
            <Button 
              onClick={() => navigate("/add-equipment")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
            <Button 
              onClick={() => navigate("/add-project")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>
        </div>

        <Stats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <EquipmentOverview />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
