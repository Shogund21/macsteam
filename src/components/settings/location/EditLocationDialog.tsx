import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Location } from "./types";

interface EditLocationDialogProps {
  isOpen: boolean;
  location: Location | null;
  editLocationId: string;
  editLocationName: string;
  onClose: () => void;
  onSave: () => void;
  onIdChange: (value: string) => void;
  onNameChange: (value: string) => void;
}

const EditLocationDialog = ({
  isOpen,
  location,
  editLocationId,
  editLocationName,
  onClose,
  onSave,
  onIdChange,
  onNameChange,
}: EditLocationDialogProps) => {
  if (!location) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Location ID"
              value={editLocationId}
              onChange={(e) => onIdChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              placeholder="Location Name (optional)"
              value={editLocationName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={onSave}
            className="w-full"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLocationDialog;