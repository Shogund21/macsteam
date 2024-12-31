import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProjectsHeader = () => {
  const navigate = useNavigate();

  return (
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
  );
};