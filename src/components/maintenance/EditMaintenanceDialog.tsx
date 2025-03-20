
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import MaintenanceCheckForm from "./MaintenanceCheckForm";
import { useState, useEffect } from "react";

interface EditMaintenanceDialogProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const EditMaintenanceDialog = ({ check, open, onOpenChange, onComplete }: EditMaintenanceDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCheck, setCurrentCheck] = useState<MaintenanceCheck | null>(null);

  // Ensure we're working with the latest check data
  useEffect(() => {
    if (open && check) {
      console.log('EditMaintenanceDialog received check:', check);
      setCurrentCheck(check);
    }
  }, [open, check]);

  const handleComplete = () => {
    console.log('Edit completed, closing dialog');
    setIsSubmitting(false);
    onComplete();
    onOpenChange(false);
  };

  // Only render the form when we have data and dialog is open
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (isSubmitting) {
        console.log('Preventing dialog close during submission');
        return; // Prevent closing while submitting
      }
      console.log('Dialog open state changing to:', isOpen);
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Edit Maintenance Check
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {currentCheck && (
            <MaintenanceCheckForm 
              initialData={currentCheck}
              onComplete={handleComplete}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaintenanceDialog;
