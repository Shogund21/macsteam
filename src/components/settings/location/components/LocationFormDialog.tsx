
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LocationData } from "../schemas/locationSchema";
import { LocationForm } from "../LocationForm";

interface LocationFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: LocationData;
  onSuccess: () => void;
  title: string;
  description: string;
}

export const LocationFormDialog = ({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
  title,
  description
}: LocationFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <LocationForm initialData={initialData} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
