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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              HVAC Maintenance Checks
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Daily preventative maintenance checks for chillers and air handlers
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> New Check
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          {showForm ? (
            <div className="animate-fade-in">
              <MaintenanceCheckForm onComplete={() => setShowForm(false)} />
            </div>
          ) : (
            <div className="animate-fade-in">
              <MaintenanceHistory />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MaintenanceChecks;