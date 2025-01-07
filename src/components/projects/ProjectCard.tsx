import { Project } from "@/types/project";
import { ProjectHeader } from "./card/ProjectHeader";
import { ProjectDetails } from "./card/ProjectDetails";
import { ProjectControls } from "./card/ProjectControls";

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
      <ProjectHeader 
        name={project.name}
        onDelete={() => onDelete(project.id)}
      />
      <div className="mt-4 space-y-2">
        <ProjectControls
          status={project.status}
          priority={project.priority}
          onStatusChange={(value) => onStatusChange(project.id, value)}
          onPriorityChange={(value) => onPriorityChange(project.id, value)}
        />
        <ProjectDetails
          description={project.description}
          location={project.location}
          startdate={project.startdate}
          enddate={project.enddate}
        />
      </div>
    </div>
  );
};