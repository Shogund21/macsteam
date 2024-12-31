import Layout from "@/components/Layout";
import MaintenanceCheckForm from "@/components/maintenance/MaintenanceCheckForm";
import MaintenanceHistory from "@/components/maintenance/MaintenanceHistory";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const MaintenanceChecks = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">HVAC Maintenance Checks</h1>
            <p className="text-muted-foreground mt-2">
              Daily preventative maintenance checks for chillers and air handlers
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> New Check
          </Button>
        </div>

        {showForm ? (
          <MaintenanceCheckForm onComplete={() => setShowForm(false)} />
        ) : (
          <MaintenanceHistory />
        )}
      </div>
    </Layout>
  );
};

export default MaintenanceChecks;