
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EditDescriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentDescription: string | null;
  onSave: (newDescription: string) => Promise<void>;
}

export const EditDescriptionDialog = ({
  isOpen,
  onClose,
  currentDescription,
  onSave,
}: EditDescriptionDialogProps) => {
  const [description, setDescription] = useState(currentDescription || "");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(description);
      toast({
        title: "Success",
        description: "Project description updated successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error saving description:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project description",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
