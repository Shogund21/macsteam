import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";

export const useStatusMutation = (
  projects: Project[],
  setProjects: (projects: Project[]) => void
) => {
  const { toast } = useToast();

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      console.log("Updating project status:", { projectId, newStatus });
      const timestamp = new Date().toISOString();
      
      const { error } = await supabase
        .from("projects")
        .update({ 
          status: newStatus,
          updatedat: timestamp // Changed from updated_at to updatedat
        })
        .eq("id", projectId);

      if (error) {
        console.error("Error updating project status:", error);
        throw error;
      }

      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, status: newStatus, updatedat: timestamp }
          : project
      ));

      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
      console.error("Error in handleStatusChange:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project status. Please try again.",
      });
    }
  };

  return { handleStatusChange };
};