import { Wrench, Briefcase, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Stats = () => {
  // Fetch equipment data
  const { data: equipmentData, isLoading: equipmentLoading, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch projects data
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch maintenance checks data for pending tasks
  const { data: maintenanceData, isLoading: maintenanceLoading, error: maintenanceError } = useQuery({
    queryKey: ['maintenance_checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch technicians data
  const { data: techniciansData, isLoading: techniciansLoading, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Handle loading states
  const isLoading = equipmentLoading || projectsLoading || maintenanceLoading || techniciansLoading;

  // Handle errors
  const hasError = equipmentError || projectsError || maintenanceError || techniciansError;
  if (hasError) {
    console.error('Error fetching data:', { equipmentError, projectsError, maintenanceError, techniciansError });
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-full p-6 bg-red-50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Error loading dashboard data. Please try again later.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Calculate active projects (those with status 'in_progress' or 'ongoing')
  const activeProjectsCount = projectsData?.filter(project => 
    project.status.toLowerCase() === 'in progress' || 
    project.status.toLowerCase() === 'ongoing'
  ).length || 0;

  // Calculate pending tasks (maintenance checks with status 'pending')
  const pendingTasksCount = maintenanceData?.filter(check => 
    check.status === 'pending'
  ).length || 0;

  const stats = [
    {
      name: "Total Equipment",
      value: isLoading ? "..." : equipmentData?.length.toString() || "0",
      icon: Wrench,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Active Projects",
      value: isLoading ? "..." : activeProjectsCount.toString(),
      icon: Briefcase,
      change: "-0.5%",
      changeType: "negative",
    },
    {
      name: "Pending Tasks",
      value: isLoading ? "..." : pendingTasksCount.toString(),
      icon: Clock,
      change: "+2.1%",
      changeType: "positive",
    },
    {
      name: "Available Technicians",
      value: isLoading 
        ? "..." 
        : (techniciansData?.filter(tech => tech.isAvailable).length || 0).toString(),
      icon: AlertCircle,
      change: "-1.5%",
      changeType: "positive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-[#1EAEDB]" />
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
  );
};

export default Stats;