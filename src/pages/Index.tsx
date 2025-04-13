
import Layout from "@/components/Layout";
import Stats from "@/components/dashboard/Stats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import EquipmentOverview from "@/components/dashboard/EquipmentOverview";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Maintenance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your equipment and maintenance operations</p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate("/maintenance-checks")}
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">View</span> Maintenance
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              onClick={() => navigate("/analytics")}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">View</span> Analytics
            </Button>
          </div>
        </div>
      
        {/* Stats Cards */}
        <div className="my-6">
          <Stats />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <EquipmentOverview />
          <RecentActivities />
        </div>
        
        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="border bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Equipment Management</CardTitle>
              <CardDescription>View and manage all equipment</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-slate-600">Track status, location, and maintenance history of all your equipment items.</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-blue-700 hover:text-blue-800 hover:bg-blue-100"
                onClick={() => navigate("/equipment")}
              >
                View Equipment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Projects</CardTitle>
              <CardDescription>Track ongoing and upcoming projects</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-slate-600">Manage all maintenance projects, deadlines, and assigned technicians.</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-purple-700 hover:text-purple-800 hover:bg-purple-100"
                onClick={() => navigate("/projects")}
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
              <CardDescription>View detailed analytics</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-slate-600">Get insights on maintenance performance, completion rates, and equipment status.</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-green-700 hover:text-green-800 hover:bg-green-100"
                onClick={() => navigate("/analytics")}
              >
                View Analytics
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
