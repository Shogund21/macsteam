
import { Wrench, Briefcase, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Stats = () => {
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

  // Fetch projects data
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      return data;
    },
  });

  // Fetch maintenance checks data for pending tasks
  const { data: maintenanceData, isLoading: maintenanceLoading } = useQuery({
    queryKey: ['maintenance_checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      if (error) {
        console.error('Error fetching maintenance checks:', error);
        throw error;
      }
      return data;
    },
  });

  // Calculate active projects (those with status 'in_progress' or 'ongoing')
  const activeProjectsCount = projectsData?.filter(project => 
    project.status.toLowerCase() === 'in progress' || 
    project.status.toLowerCase() === 'ongoing'
  ).length || 0;

  // Calculate pending tasks (maintenance checks with status 'pending')
  const pendingTasksCount = maintenanceData?.filter(check => 
    check.status === 'pending'
  ).length || 0;

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
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      name: "Active Projects",
      value: projectsLoading ? "..." : activeProjectsCount.toString(),
      icon: Briefcase,
      change: "-0.5%",
      changeType: "negative",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-500"
    },
    {
      name: "Pending Tasks",
      value: maintenanceLoading ? "..." : pendingTasksCount.toString(),
      icon: Clock,
      change: "+2.1%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-500"
    },
    {
      name: "Available Technicians",
      value: techniciansLoading 
        ? "..." 
        : techniciansData?.filter(tech => tech.isAvailable).length.toString() || "0",
      icon: AlertCircle,
      change: "-1.5%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.name} 
            className={`p-6 border-none shadow-lg animate-fade-in hover:shadow-xl transition-all ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`h-14 w-14 rounded-full ${stat.iconBgColor} flex items-center justify-center ${stat.iconColor}`}>
                <Icon className="h-7 w-7" />
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
              <span className="text-sm text-gray-500 ml-2">
                from last month
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Stats;
