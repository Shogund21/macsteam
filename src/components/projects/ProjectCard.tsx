import { Project } from "@/types/project";
import { StatusSelect } from "./StatusSelect";
import { PrioritySelect } from "./PrioritySelect";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProjectCardProps {
  project: Project;
  onStatusChange: (projectId: string, newStatus: string) => Promise<void>;
  onPriorityChange: (projectId: string, newPriority: string) => Promise<void>;
  onDelete: (projectId: string) => Promise<void>;
}

export const ProjectCard = ({ 
  project, 
  onStatusChange, 
  onPriorityChange,
  onDelete
}: ProjectCardProps) => {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
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
                onClick={() => onDelete(project.id)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {project.description || "No description"}
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Status:</span>
          <StatusSelect
            value={project.status}
            onValueChange={(value) => onStatusChange(project.id, value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Priority:</span>
          <PrioritySelect
            value={project.priority}
            onValueChange={(value) => onPriorityChange(project.id, value)}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Location:</span>
          <span className="text-sm">{project.location || "Not specified"}</span>
        </div>
        {project.startdate && (
          <div className="flex justify-between">
            <span className="text-sm font-medium">Start Date:</span>
            <span className="text-sm">
              {new Date(project.startdate).toLocaleDateString()}
            </span>
          </div>
        )}
        {project.enddate && (
          <div className="flex justify-between">
            <span className="text-sm font-medium">End Date:</span>
            <span className="text-sm">
              {new Date(project.enddate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};