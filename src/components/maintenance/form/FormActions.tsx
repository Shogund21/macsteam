
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormActionsProps {
  onCancel: () => void;
  isEditing?: boolean;
}

const FormActions = ({ onCancel, isEditing }: FormActionsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'flex flex-col' : 'flex justify-end space-x-4'} sticky bottom-0 bg-white p-4 border-t shadow-md z-10`}>
      {isMobile && (
        <Button 
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-2"
        >
          {isEditing ? 'Update Check' : 'Submit Check'}
        </Button>
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className={`${isMobile ? 'w-full' : ''}`}
      >
        Cancel
      </Button>
      
      {!isMobile && (
        <Button 
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {isEditing ? 'Update Check' : 'Submit Check'}
        </Button>
      )}
    </div>
  );
};

export default FormActions;
