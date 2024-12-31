import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatusSelect } from "@/components/projects/StatusSelect";
import { PrioritySelect } from "@/components/projects/PrioritySelect";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startdate: string | null;
  enddate: string | null;
  priority: string;
  createdat: string | null;
  updatedat: string | null;
}

const Projects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all projects
            </p>
          </div>
          <Button 
            onClick={() => navigate("/add-project")}
            className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>

        {loading ? (
          <div className="text-center">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects found. Create your first project by clicking the Add Project button.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description || "No description"}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <StatusSelect
                      value={project.status}
                      onValueChange={(value) => handleStatusChange(project.id, value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Priority:</span>
                    <PrioritySelect
                      value={project.priority}
                      onValueChange={(value) => handlePriorityChange(project.id, value)}
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
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;