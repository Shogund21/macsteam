
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

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
  const isMobile = useIsMobile();
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Submit button clicked, onSubmit handler exists:', !!onSubmit);
    if (onSubmit) {
      onSubmit();
    }
  };
  
  return (
    <div className={`
      ${isMobile 
        ? 'bg-white p-4 border-t shadow-lg' 
        : 'pt-4'
      } 
      flex ${isMobile ? 'flex-col gap-3' : 'flex-row justify-end gap-3'}
    `}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className={`${isMobile ? 'w-full min-h-[48px]' : ''} text-base font-medium bg-blue-800 hover:bg-blue-900 text-white border-blue-800`}
      >
        Cancel
      </Button>
      
      <Button 
        type="button"
        onClick={handleSubmit}
        className={`${isMobile ? 'w-full min-h-[48px]' : ''} bg-blue-800 hover:bg-blue-900 text-white text-base font-medium`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
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
