import { useState } from "react";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useProjectCard = (project: Project) => {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(project.status);
  const [description, setDescription] = useState(project.description);

  const handleStatusChange = async (value: string) => {
    try {
      await onStatusChange(project.id, value);
      setCurrentStatus(value);
      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
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

  return {
    currentStatus,
    description,
    handleStatusChange,
    handlePriorityChange,
    handleDescriptionUpdate,
  };
};