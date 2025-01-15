import { Project } from "@/types/project";
import { ProjectHeader } from "./card/ProjectHeader";
import { ProjectDetails } from "./card/ProjectDetails";
import { ProjectControls } from "./card/ProjectControls";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditDescriptionDialog } from "./EditDescriptionDialog";
import { supabase } from "@/integrations/supabase/client";

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
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(project.description);
  const [currentStatus, setCurrentStatus] = useState(project.status);

  const handleStatusChange = async (value: string) => {
    try {
      await onStatusChange(project.id, value);
      setCurrentStatus(value);
      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
      // Revert the status if there's an error
      setCurrentStatus(project.status);
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

  const handleDescriptionUpdate = async (newDescription: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          description: newDescription,
          updatedat: new Date().toISOString()
        })
        .eq("id", project.id);

      if (error) throw error;
      setDescription(newDescription);
    } catch (error) {
      console.error("Error updating description:", error);
      throw error;
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
          status={currentStatus}
          priority={project.priority}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
        <ProjectDetails
          description={description}
          location={project.location}
          startdate={project.startdate}
          enddate={project.enddate}
          onEditDescription={() => setIsEditingDescription(true)}
        />
      </div>
      <EditDescriptionDialog
        isOpen={isEditingDescription}
        onClose={() => setIsEditingDescription(false)}
        currentDescription={description}
        onSave={handleDescriptionUpdate}
      />
    </div>
  );
};