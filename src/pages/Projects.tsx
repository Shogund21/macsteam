import Layout from "@/components/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { 
    projects, 
    loading, 
    handleStatusChange, 
    handlePriorityChange,
    handleDelete 
  } = useProjects();

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <ProjectsHeader />
        
        {loading ? (
          <div className="text-center">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects found. Create your first project by clicking the Add Project button.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onStatusChange={handleStatusChange}
                onPriorityChange={handlePriorityChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;