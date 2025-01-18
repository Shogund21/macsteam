import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LocationForm } from "./LocationForm";

interface LocationActionsProps {
  location: {
    id: string;
    name: string;
    store_number: string;
  };
  onEdit: (location: any) => void;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}

export const LocationActions = ({ location, onEdit, onDelete, onSuccess }: LocationActionsProps) => {
  return (
    <div className="space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(location)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <LocationForm
            initialData={location}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(location.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};