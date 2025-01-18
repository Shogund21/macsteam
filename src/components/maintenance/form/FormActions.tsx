import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isEditing?: boolean;
}

const FormActions = ({ onCancel, isEditing }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 sticky bottom-0 bg-white p-4 border-t">
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
      >
        {isEditing ? 'Update Check' : 'Submit Check'}
      </Button>
    </div>
  );
};

export default FormActions;