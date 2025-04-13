
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
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  status: string;
  timestamp: string;
  icon: any;
}

const RecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      setIsLoading(true);
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
          .slice(0, 5);

        setActivities(sortedActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      } finally {
        setIsLoading(false);
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
    <Card className="border shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-gray-800">Recent Activities</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Latest updates and changes</p>
        </div>
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Live Updates
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : activities.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">No recent activities</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="hover:bg-gray-50 transition-colors duration-200">
                <ActivityItem {...activity} />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
