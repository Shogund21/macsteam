import { Project } from "@/types/project";
import { StatusSelect } from "./StatusSelect";
import { PrioritySelect } from "./PrioritySelect";

interface ProjectCardProps {
  project: Project;
  onStatusChange: (projectId: string, newStatus: string) => Promise<void>;
  onPriorityChange: (projectId: string, newPriority: string) => Promise<void>;
}

export const ProjectCard = ({ 
  project, 
  onStatusChange, 
  onPriorityChange 
}: ProjectCardProps) => {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">{project.name}</h3>
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