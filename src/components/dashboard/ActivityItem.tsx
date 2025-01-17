import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActivityItemProps {
  id: string;
  title: string;
  status: string;
  timestamp: string;
  icon: LucideIcon;
}

const ActivityItem = ({ id, title, status, timestamp, icon: Icon }: ActivityItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const [type, itemId] = id.split('-');
    if (type === 'project') {
      navigate(`/projects?highlight=${itemId}`);
    } else if (type === 'maintenance') {
      navigate(`/maintenance-checks?highlight=${itemId}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
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