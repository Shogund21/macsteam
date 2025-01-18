import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import MaintenanceCheckForm from "./MaintenanceCheckForm";

interface EditMaintenanceDialogProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const EditMaintenanceDialog = ({ check, open, onOpenChange, onComplete }: EditMaintenanceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Edit Maintenance Check
          </DialogTitle>
        </DialogHeader>
        <MaintenanceCheckForm 
          initialData={check}
          onComplete={() => {
            onComplete();
            onOpenChange(false);
          }} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditMaintenanceDialog;