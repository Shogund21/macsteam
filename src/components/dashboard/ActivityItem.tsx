
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
    <div className="flex items-center p-4 gap-4">
      <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{title}</p>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <span className="truncate">{status}</span>
          <span className="mx-1.5 inline-block">•</span>
          <span className="whitespace-nowrap">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
