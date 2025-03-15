
import React from "react";
import { Button } from "@/components/ui/button";

interface FormSubmitButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const FormSubmitButtons = ({ onCancel, isSubmitting }: FormSubmitButtonsProps) => {
  return (
    <div className="flex justify-end space-x-4">
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
        variant="default"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Check"}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
