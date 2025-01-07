import { Project } from "@/types/project";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  onStatusChange: (projectId: string, newStatus: string) => Promise<void>;
  onPriorityChange: (projectId: string, newPriority: string) => Promise<void>;
  onDelete: (projectId: string) => Promise<void>;
}

export const ProjectList = ({ 
  projects,
  onStatusChange,
  onPriorityChange,
  onDelete
}: ProjectListProps) => {
  if (!projects?.length) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="p-4 md:p-6">
          <ProjectCard
            project={project}
            onStatusChange={onStatusChange}
            onPriorityChange={onPriorityChange}
            onDelete={onDelete}
          />
        </Card>
      ))}
    </div>
  );
};