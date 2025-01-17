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
import { useActivitiesData } from "@/hooks/dashboard/useActivitiesData";

interface Activity {
  id: string;
  title: string;
  status: string;
  timestamp: string;
  icon: any;
}

const RecentActivities = () => {
  const { activities } = useActivitiesData();

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