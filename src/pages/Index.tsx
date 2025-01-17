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
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Welcome back to Mac's Facilities Maintenance System
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/print")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
            >
              <Printer className="mr-2 h-4 w-4" /> Print Lists
            </Button>
            <Button 
              onClick={() => navigate("/add-equipment")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
            <Button 
              onClick={() => navigate("/add-project")}
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
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