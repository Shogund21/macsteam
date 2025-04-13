
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ActivityItem from "./ActivityItem";
import { 
  getStatusIcon, 
  getMaintenanceIcon, 
  formatTimestamp, 
  getOriginalDate 
} from "@/utils/activityUtils";
import { Badge } from "@/components/ui/badge";

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
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50 animate-fade-in">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-black">Recent Activities</CardTitle>
          <Badge className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white">Last Updated</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-black text-center py-4">No recent activities</p>
          ) : (
            activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                {...activity}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
