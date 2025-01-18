import { Badge } from "@/components/ui/badge";

interface MaintenanceStatusBadgeProps {
  status: string | null;
}

const MaintenanceStatusBadge = ({ status }: MaintenanceStatusBadgeProps) => {
  const statusColors = {
    completed: "bg-green-500",
    pending: "bg-yellow-500",
    issue_found: "bg-red-500"
  };
  
  return (
    <Badge className={`${statusColors[status as keyof typeof statusColors] || "bg-gray-500"}`}>
      {status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
    </Badge>
  );
};

export default MaintenanceStatusBadge;