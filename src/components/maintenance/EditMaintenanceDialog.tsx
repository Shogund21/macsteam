
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import MaintenanceCheckForm from "./MaintenanceCheckForm";
import { useState } from "react";

interface EditMaintenanceDialogProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const EditMaintenanceDialog = ({ check, open, onOpenChange, onComplete }: EditMaintenanceDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = () => {
    setIsSubmitting(false);
    onComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (isSubmitting) return; // Prevent closing while submitting
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Edit Maintenance Check
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <MaintenanceCheckForm 
            initialData={check}
            onComplete={handleComplete} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaintenanceDialog;
