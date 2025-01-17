import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting?: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};