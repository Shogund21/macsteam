
import { Wrench, Briefcase, Clock, UserCheck } from "lucide-react";
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
      bgColor: "from-blue-500 to-blue-600",
      textColor: "text-white",
      iconColor: "text-blue-100"
    },
    {
      name: "Active Projects",
      value: projectsLoading ? "..." : activeProjectsCount.toString(),
      icon: Briefcase,
      change: "-0.5%",
      changeType: "negative",
      bgColor: "from-purple-500 to-purple-600",
      textColor: "text-white",
      iconColor: "text-purple-100"
    },
    {
      name: "Pending Tasks",
      value: maintenanceLoading ? "..." : pendingTasksCount.toString(),
      icon: Clock,
      change: "+2.1%",
      changeType: "positive",
      bgColor: "from-amber-500 to-amber-600",
      textColor: "text-white",
      iconColor: "text-amber-100"
    },
    {
      name: "Available Technicians",
      value: techniciansLoading 
        ? "..." 
        : techniciansData?.filter(tech => tech.isAvailable).length.toString() || "0",
      icon: UserCheck,
      change: "-1.5%",
      changeType: "positive",
      bgColor: "from-green-500 to-green-600",
      textColor: "text-white",
      iconColor: "text-green-100"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.name} 
            className={`bg-gradient-to-r ${stat.bgColor} border-none shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={stat.textColor}>
                  <p className="text-sm font-medium opacity-90">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-white/10 flex items-center justify-center ${stat.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium">
                <span
                  className={cn(
                    stat.changeType === "positive"
                      ? "text-green-200"
                      : "text-red-200"
                  )}
                >
                  {stat.change}
                </span>
                <span className={`${stat.textColor} ml-2 opacity-80`}>
                  from last month
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Stats;
