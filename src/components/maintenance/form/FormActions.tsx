import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isValid: boolean;
}

const FormActions = ({ onCancel, isValid }: FormActionsProps) => {
  console.log('Form actions render with isValid:', isValid);
  
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
        className={`${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white`}
        disabled={!isValid}
      >
        Submit Check
      </Button>
    </div>
  );
};

export default FormActions;