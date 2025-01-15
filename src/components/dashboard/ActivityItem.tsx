import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  id: string;
  title: string;
  status: string;
  timestamp: string;
  icon: LucideIcon;
}

const ActivityItem = ({ title, status, timestamp, icon: Icon }: ActivityItemProps) => {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">
          {status} • {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;