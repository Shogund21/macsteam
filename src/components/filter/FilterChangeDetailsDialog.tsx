
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterChange } from "@/types/filterChanges";
import { FilterStatusBadge } from "./FilterStatusBadge";

interface FilterChangeDetailsDialogProps {
  filterChange: FilterChange;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterChangeDetailsDialog = ({
  filterChange,
  open,
  onOpenChange,
}: FilterChangeDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Filter Change Details</span>
            <FilterStatusBadge 
              status={filterChange.status}
              calculatedStatus={filterChange.status_calc}
            />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Equipment</h3>
              <p className="text-base">{filterChange.equipment?.name || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="text-base">{filterChange.equipment?.location || "Unknown"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Filter Type</h3>
              <p className="text-base">{filterChange.filter_type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Filter Size</h3>
              <p className="text-base">{filterChange.filter_size}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Installation Date</h3>
              <p className="text-base">
                {format(new Date(filterChange.installation_date), "PPP")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
              <p className="text-base">
                {format(new Date(filterChange.due_date), "PPP")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Technician</h3>
            <p className="text-base">
              {filterChange.technician
                ? `${filterChange.technician.firstName} ${filterChange.technician.lastName}`
                : "Unassigned"}
            </p>
          </div>

          {filterChange.filter_condition && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Filter Condition</h3>
              <p className="text-base">{filterChange.filter_condition}</p>
            </div>
          )}

          {filterChange.notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Notes</h3>
              <p className="text-base whitespace-pre-line">{filterChange.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterChangeDetailsDialog;
