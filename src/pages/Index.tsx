import Layout from "@/components/Layout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back to Mac's Facilities Maintenance System
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/add-equipment")}
              className="bg-blue-600 hover:bg-blue-700 text-black"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Equipment
            </Button>
            <Button 
              onClick={() => navigate("/add-project")}
              className="bg-blue-600 hover:bg-blue-700 text-black"
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