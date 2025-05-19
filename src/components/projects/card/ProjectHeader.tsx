
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProjectHeaderProps {
  name: string;
  onDelete: () => Promise<void>;
}

export const ProjectHeader = ({ name, onDelete }: ProjectHeaderProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  return (
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold">{name}</h3>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => setIsAlertOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
