import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export const FormActions = ({ isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      {onCancel && (
        <Button 
          type="button" 
          variant="outline"
          className="border-gray-200 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};