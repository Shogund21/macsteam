import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

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

const RecentActivities = () => {
  return (
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
  );
};

export default RecentActivities;