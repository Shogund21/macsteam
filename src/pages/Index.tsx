import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  Wrench,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  // Fetch equipment data
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  // Fetch technicians data
  const { data: techniciansData, isLoading: techniciansLoading } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      return data;
    },
  });

  const stats = [
    {
      name: "Total Equipment",
      value: equipmentLoading ? "..." : equipmentData?.length.toString() || "0",
      icon: Wrench,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Active Projects",
      value: "12",
      icon: Briefcase,
      change: "-0.5%",
      changeType: "negative",
    },
    {
      name: "Pending Tasks",
      value: "23",
      icon: Clock,
      change: "+2.1%",
      changeType: "positive",
    },
    {
      name: "Available Technicians",
      value: techniciansLoading 
        ? "..." 
        : techniciansData?.filter(tech => tech.isAvailable).length.toString() || "0",
      icon: AlertCircle,
      change: "-1.5%",
      changeType: "positive",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "HVAC Maintenance",
      status: "Completed",
      timestamp: "2 hours ago",
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: "Elevator Inspection",
      status: "In Progress",
      timestamp: "4 hours ago",
      icon: Clock,
    },
    {
      id: 3,
      title: "Generator Test",
      status: "Scheduled",
      timestamp: "1 day ago",
      icon: Clock,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back to Mac's Facilities Maintenance System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6 glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    from last month
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.status} • {activity.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 glass">
            <h2 className="text-lg font-semibold mb-4">Equipment Overview</h2>
            <div className="space-y-4">
              {equipmentLoading ? (
                <p>Loading equipment data...</p>
              ) : equipmentData && equipmentData.length > 0 ? (
                equipmentData.slice(0, 3).map((equipment) => (
                  <div key={equipment.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <p className="text-sm text-muted-foreground">{equipment.location}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent">
                        {equipment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No equipment data available</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;