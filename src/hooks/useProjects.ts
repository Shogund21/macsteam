import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";

export const useProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("createdat", { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load projects. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    handleStatusChange,
    handlePriorityChange
  };
};