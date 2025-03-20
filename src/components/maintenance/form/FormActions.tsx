
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

const FormActions = ({ 
  onCancel, 
  isEditing = false, 
  isSubmitting = false,
  onSubmit
}: FormActionsProps) => {
  console.log('FormActions render:', { isEditing, isSubmitting });
  
  const handleClick = () => {
    console.log('Submit button clicked, onSubmit handler exists:', !!onSubmit);
    if (onSubmit) {
      onSubmit();
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-end gap-2 pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      
      <Button 
        type={onSubmit ? "button" : "submit"}
        onClick={handleClick}
        className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>{isEditing ? 'Updating...' : 'Saving...'}</span>
          </div>
        ) : (
          isEditing ? 'Update Maintenance Check' : 'Submit Maintenance Check'
        )}
      </Button>
    </div>
  );
};

export default FormActions;
