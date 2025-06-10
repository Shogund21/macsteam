
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FormActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/equipment")}
        className="bg-blue-800 hover:bg-blue-900 text-white border-blue-800"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-blue-800 hover:bg-blue-900 text-white"
      >
        Add Equipment
      </Button>
    </div>
  );
};

export default FormActions;
