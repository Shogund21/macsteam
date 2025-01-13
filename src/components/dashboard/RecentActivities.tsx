import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Activity {
  id: string;
  title: string;
  status: string;
  timestamp: string;
  icon: any;
}

const RecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        // Fetch recent projects
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .order("updatedat", { ascending: false })
          .limit(2);

        // Fetch recent maintenance checks
        const { data: maintenanceChecks } = await supabase
          .from("hvac_maintenance_checks")
          .select(`
            *,
            equipment:equipment_id(name),
            technician:technician_id(firstName, lastName)
          `)
          .order("updated_at", { ascending: false })
          .limit(2);

        const combinedActivities: Activity[] = [];

        // Process projects
        projects?.forEach((project) => {
          combinedActivities.push({
            id: `project-${project.id}`,
            title: project.name,
            status: project.status,
            timestamp: formatTimestamp(project.updatedat),
            icon: getStatusIcon(project.status),
          });
        });

        // Process maintenance checks
        maintenanceChecks?.forEach((check) => {
          const equipmentName = check.equipment?.name || "Unknown Equipment";
          const technicianName = check.technician 
            ? `${check.technician.firstName} ${check.technician.lastName}`
            : "Unassigned";

          combinedActivities.push({
            id: `maintenance-${check.id}`,
            title: `${equipmentName} Check`,
            status: `${check.status} by ${technicianName}`,
            timestamp: formatTimestamp(check.updated_at),
            icon: getMaintenanceIcon(check.status),
          });
        });

        // Sort by timestamp and take the most recent 4
        const sortedActivities = combinedActivities
          .sort((a, b) => {
            const dateA = new Date(getOriginalDate(a.timestamp)).getTime();
            const dateB = new Date(getOriginalDate(b.timestamp)).getTime();
            return dateB - dateA;
          })
          .slice(0, 4);

        setActivities(sortedActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchRecentActivities();

    // Set up real-time subscriptions
    const projectsChannel = supabase
      .channel('public:projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => fetchRecentActivities()
      )
      .subscribe();

    const maintenanceChannel = supabase
      .channel('public:maintenance')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'hvac_maintenance_checks' },
        () => fetchRecentActivities()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(maintenanceChannel);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return CheckCircle2;
      case 'in progress':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  const getMaintenanceIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return CheckCircle2;
      case 'pending':
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  const formatTimestamp = (date: string | null): string => {
    if (!date) return "Unknown time";
    
    const now = new Date();
    const timestamp = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} days ago`;
    }
  };

  const getOriginalDate = (formattedTime: string): Date => {
    const now = new Date();
    if (formattedTime.includes("minutes")) {
      const minutes = parseInt(formattedTime);
      return new Date(now.getTime() - minutes * 60000);
    } else if (formattedTime.includes("hours")) {
      const hours = parseInt(formattedTime);
      return new Date(now.getTime() - hours * 3600000);
    } else if (formattedTime.includes("days")) {
      const days = parseInt(formattedTime);
      return new Date(now.getTime() - days * 86400000);
    }
    return now;
  };

  return (
    <Card className="p-6 glass">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
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
  );
};

export default RecentActivities;