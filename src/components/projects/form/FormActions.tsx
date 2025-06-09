
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/projects")}
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white w-full sm:w-auto"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Adding...</span>
          </div>
        ) : (
          "Add Project"
        )}
      </Button>
    </div>
  );
};
