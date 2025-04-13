
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
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 cursor-pointer">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] text-white flex items-center justify-center shadow-md">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-black">{title}</p>
        <p className="text-sm text-gray-700">
          {status} • {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
