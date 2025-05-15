
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FilterChangesList from "./FilterChangesList";
import FilterChangeFormDialog from "./FilterChangeFormDialog";
import { Plus } from "lucide-react";

interface EquipmentFilterChangesProps {
  equipmentId: string;
}

const EquipmentFilterChanges = ({ equipmentId }: EquipmentFilterChangesProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filter Changes</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAddDialog(true)}
          className="hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Filter Change
        </Button>
      </div>
      
      <FilterChangesList equipmentId={equipmentId} />
      
      <FilterChangeFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        equipmentId={equipmentId}
      />
    </div>
  );
};

export default EquipmentFilterChanges;
