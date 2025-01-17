import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export const FormActions = ({ isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};