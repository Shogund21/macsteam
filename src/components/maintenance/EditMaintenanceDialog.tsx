
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MaintenanceCheckForm from "./MaintenanceCheckForm";
import { MaintenanceCheck } from "@/types/maintenance";

interface EditMaintenanceDialogProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const EditMaintenanceDialog = ({
  check,
  open,
  onOpenChange,
  onComplete
}: EditMaintenanceDialogProps) => {
  // Log the check data being passed to the form
  console.log('EditMaintenanceDialog - Initial check data:', check);

  const handleComplete = () => {
    console.log('EditMaintenanceDialog - Handling completion');
    onComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <MaintenanceCheckForm 
          onComplete={handleComplete} 
          initialData={check}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditMaintenanceDialog;
