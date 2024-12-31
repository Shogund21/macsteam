import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";

export const useProjectMutations = (projects: Project[], setProjects: (projects: Project[]) => void) => {
  const { toast } = useToast();

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          status: newStatus,
          updatedat: new Date().toISOString()
        })
        .eq("id", projectId);

      if (error) throw error;

      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, status: newStatus, updatedat: new Date().toISOString() }
          : project
      ));

      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
      console.error("Error updating project status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project status. Please try again.",
      });
    }
  };

  const handlePriorityChange = async (projectId: string, newPriority: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          priority: newPriority,
          updatedat: new Date().toISOString()
        })
        .eq("id", projectId);

      if (error) throw error;

      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, priority: newPriority, updatedat: new Date().toISOString() }
          : project
      ));

      toast({
        title: "Success",
        description: "Project priority updated successfully",
      });
    } catch (error) {
      console.error("Error updating project priority:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project priority. Please try again.",
      });
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjects(projects.filter(project => project.id !== projectId));

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project. Please try again.",
      });
    }
  };

  return {
    handleStatusChange,
    handlePriorityChange,
    handleDelete
  };
};