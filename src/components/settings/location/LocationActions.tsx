
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { LocationForm } from "./LocationForm";

interface LocationActionsProps {
  location: {
    id: string;
    store_number: string;
    name?: string;
    is_active?: boolean;
    company_id?: string;
  };
  onEdit: (location: any) => void;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}

export const LocationActions = ({ location, onEdit, onDelete, onSuccess }: LocationActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleEditSuccess = async () => {
    console.log("Edit successful, calling onSuccess");
    try {
      // Ensure data is refetched after successful edit
      await onSuccess();
      console.log("Data refreshed successfully after edit");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error in handleEditSuccess:", error);
    }
  };

  return (
    <div className="flex justify-end space-x-2">
      <Dialog 
        open={isEditDialogOpen} 
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            // Force refresh when dialog is closed
            console.log("Edit dialog closed, triggering refresh");
            onSuccess();
          }
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Edit button clicked for location:", location);
            setIsEditDialogOpen(true);
          }}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the location information below.
            </DialogDescription>
          </DialogHeader>
          <LocationForm 
            initialData={location} 
            onSuccess={handleEditSuccess} 
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the location "{location.name?.trim() || location.store_number}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                onDelete(location.id);
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
