import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/projects")}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
      >
        {isSubmitting ? "Adding..." : "Add Project"}
      </Button>
    </div>
  );
};