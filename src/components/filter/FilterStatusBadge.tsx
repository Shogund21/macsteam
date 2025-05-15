
import { Badge } from "@/components/ui/badge";
import { FilterChange } from "@/types/filterChanges";

interface FilterStatusBadgeProps {
  status: FilterChange['status'];
  calculatedStatus?: FilterChange['status_calc'];
  className?: string;
}

export const FilterStatusBadge = ({ status, calculatedStatus, className }: FilterStatusBadgeProps) => {
  const getStatusColor = () => {
    if (status === 'completed') return "bg-green-500";
    
    // For active filters, use the calculated status if available
    if (calculatedStatus === 'overdue') return "bg-red-500";
    if (calculatedStatus === 'due_soon') return "bg-yellow-500";
    
    return "bg-blue-500"; // Default for upcoming and other states
  };

  const getStatusText = () => {
    if (status === 'completed') return "COMPLETED";
    if (status === 'overdue') return "OVERDUE";
    
    // For active filters with calculated status
    if (calculatedStatus === 'overdue') return "OVERDUE";
    if (calculatedStatus === 'due_soon') return "DUE SOON";
    
    return "ACTIVE"; // Default for upcoming and other states
  };

  return (
    <Badge className={`${getStatusColor()} ${className || ""}`}>
      {getStatusText()}
    </Badge>
  );
};
