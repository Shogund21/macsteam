import { Project } from "@/types/project";
import { ProjectHeader } from "./card/ProjectHeader";
import { ProjectDetails } from "./card/ProjectDetails";
import { ProjectControls } from "./card/ProjectControls";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleStatusChange = async (value: string) => {
    try {
      await onStatusChange(project.id, value);
      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project status",
      });
    }
  };

  const handlePriorityChange = async (value: string) => {
    try {
      await onPriorityChange(project.id, value);
      toast({
        title: "Success",
        description: "Project priority updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project priority",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(project.id);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    }
  };

  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <ProjectHeader 
        name={project.name}
        onDelete={handleDelete}
      />
      <div className="mt-4 space-y-2">
        <ProjectControls
          status={project.status}
          priority={project.priority}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
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