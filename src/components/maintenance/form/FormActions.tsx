
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const FormActions = ({ onCancel, isEditing = false, isSubmitting = false }: FormActionsProps) => {
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
        type="submit"
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
