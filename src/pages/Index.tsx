
import Layout from "@/components/Layout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Plus, List, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to AssetGuardian - Your HVAC maintenance hub
            </p>
          </div>
          
          {!isMobile && (
            <Button 
              onClick={() => navigate('/maintenance-checks')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Maintenance Check
            </Button>
          )}
        </div>

        {/* Mobile Quick Actions are handled in MobileLayout */}
        
        <Stats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivities />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Access</h2>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/equipment')}
                className="justify-start"
              >
                Equipment Management
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/projects')}
                className="justify-start"
              >
                Project Tracking
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/filter-changes')}
                className="justify-start"
              >
                Filter Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
