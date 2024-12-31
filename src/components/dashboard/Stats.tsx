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

  return (
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
  );
};

export default Stats;