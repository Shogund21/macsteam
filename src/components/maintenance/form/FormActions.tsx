import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isValid: boolean;
}

const FormActions = ({ onCancel, isValid }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        className="bg-blue-500 text-white hover:bg-blue-600"
        disabled={!isValid}
      >
        Submit Check
      </Button>
    </div>
  );
};

export default FormActions;