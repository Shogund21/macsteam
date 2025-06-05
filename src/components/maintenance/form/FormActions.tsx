
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
    <div className={`flex ${isMobile ? 'flex-col gap-3 sticky bottom-0 bg-white p-4 border-t shadow-lg z-50' : 'flex-row justify-end gap-3'} pt-4`}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className={`${isMobile ? 'w-full min-h-[48px]' : ''} text-base font-medium`}
      >
        Cancel
      </Button>
      
      <Button 
        type={onSubmit ? "button" : "submit"}
        onClick={onSubmit ? handleSubmit : undefined}
        className={`${isMobile ? 'w-full min-h-[48px]' : ''} bg-[#1EAEDB] hover:bg-[#33C3F0] text-white text-base font-medium`}
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
