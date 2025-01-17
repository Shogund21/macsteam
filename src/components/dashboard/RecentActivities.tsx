import { Card } from "@/components/ui/card";
import ActivityItem from "./ActivityItem";
import { useActivitiesData } from "@/hooks/dashboard/useActivitiesData";

const RecentActivities = () => {
  const { activities } = useActivitiesData();

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-sm shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-[#1EAEDB]">Recent Activities</h2>
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