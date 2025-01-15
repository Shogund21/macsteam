import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ActivityItem from "./ActivityItem";
import { 
  getStatusIcon, 
  getMaintenanceIcon, 
  formatTimestamp, 
  getOriginalDate 
} from "@/utils/activityUtils";

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
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .order("updatedat", { ascending: false })
          .limit(2);

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

        projects?.forEach((project) => {
          combinedActivities.push({
            id: `project-${project.id}`,
            title: project.name,
            status: project.status,
            timestamp: formatTimestamp(project.updatedat),
            icon: getStatusIcon(project.status),
          });
        });

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

  return (
    <Card className="p-6 glass">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            {...activity}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentActivities;