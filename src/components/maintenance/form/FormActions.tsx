
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
        ? 'w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm' 
        : 'pt-4'
      } 
      flex ${isMobile ? 'flex-col gap-3' : 'flex-row justify-end gap-3'}
    `}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className={`${isMobile ? 'w-full min-h-[48px] order-2' : ''} text-base font-medium bg-white hover:bg-gray-50 text-gray-700 border-gray-300`}
      >
        Cancel
      </Button>
      
      <Button 
        type="button"
        onClick={handleSubmit}
        className={`${isMobile ? 'w-full min-h-[48px] order-1' : ''} bg-blue-600 hover:bg-blue-700 text-white text-base font-medium`}
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
