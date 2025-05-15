
import { format } from "date-fns";
import { FilterChange } from "@/types/filterChanges";
import { FilterStatusBadge } from "./FilterStatusBadge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Eye, Trash } from "lucide-react";
import { useState } from "react";
import { useFilterChangeMutations } from "@/hooks/useFilterChangeMutations";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterChangeCardProps {
  filterChange: FilterChange;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

export const FilterChangeCard = ({ filterChange, onViewDetails, onEdit }: FilterChangeCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { completeFilterChange, remove } = useFilterChangeMutations();
  const isMobile = useIsMobile();

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      try {
        await remove.mutateAsync(filterChange.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleComplete = async () => {
    await completeFilterChange.mutateAsync(filterChange.id);
  };

  const technician = filterChange.technician 
    ? `${filterChange.technician.firstName} ${filterChange.technician.lastName}`
    : "Unassigned";

  const dueDate = new Date(filterChange.due_date);
  const installDate = new Date(filterChange.installation_date);

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm hover:shadow transition-shadow duration-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {filterChange.equipment?.name || "Unknown Equipment"}
            </h3>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
              {filterChange.filter_type} ({filterChange.filter_size})
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Due: {format(dueDate, "PPP")}</p>
            <p>Installed: {format(installDate, "PPP")}</p>
            <p>Technician: {technician}</p>
            {filterChange.filter_condition && (
              <p>Condition: {filterChange.filter_condition}</p>
            )}
          </div>
        </div>
        <div className={`flex ${isMobile ? 'w-full flex-col' : 'items-center'} gap-2`}>
          <FilterStatusBadge 
            status={filterChange.status} 
            calculatedStatus={filterChange.status_calc}
            className={isMobile ? 'self-start' : ''}
          />
          <div className={`flex ${isMobile ? 'w-full' : ''} gap-2`}>
            {filterChange.status !== 'completed' && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-green-600"
                onClick={handleComplete}
                disabled={completeFilterChange.isPending}
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-blue-600"
              onClick={() => onViewDetails(filterChange.id)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-amber-600"
              onClick={() => onEdit(filterChange.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
