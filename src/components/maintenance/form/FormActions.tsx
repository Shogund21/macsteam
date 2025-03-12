
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Save, X } from "lucide-react";

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
          className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-2 flex items-center justify-center"
        >
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? 'Update Check' : 'Submit Check'}
        </Button>
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className={`${isMobile ? 'w-full' : ''} flex items-center justify-center`}
      >
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
      
      {!isMobile && (
        <Button 
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
        >
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? 'Update Check' : 'Submit Check'}
        </Button>
      )}
    </div>
  );
};

export default FormActions;
