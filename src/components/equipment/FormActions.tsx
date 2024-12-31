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
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
      >
        Add Equipment
      </Button>
    </div>
  );
};

export default FormActions;