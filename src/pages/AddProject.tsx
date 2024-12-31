import Layout from "@/components/Layout";
import { AddProjectForm } from "@/components/projects/AddProjectForm";

const AddProject = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Add New Project</h1>
          <p className="text-muted-foreground mt-2">
            Enter the details of the new project
          </p>
        </div>
        <AddProjectForm />
      </div>
    </Layout>
  );
};

export default AddProject;