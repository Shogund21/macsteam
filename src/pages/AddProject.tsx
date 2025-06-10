
import Layout from "@/components/Layout";
import { AddProjectForm } from "@/components/projects/AddProjectForm";

const AddProject = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
            <p className="text-gray-600 mt-2">
              Enter the details of the new project
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <AddProjectForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProject;
