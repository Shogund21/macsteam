import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isValid: boolean;
}

const FormActions = ({ onCancel, isValid }: FormActionsProps) => {
  console.log("Form actions render with isValid:", isValid);
  
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="bg-white hover:bg-gray-50"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Submit Check
      </Button>
    </div>
  );
};

export default FormActions;