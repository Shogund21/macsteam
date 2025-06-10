
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
        className="bg-blue-800 hover:bg-blue-900 text-white border-blue-800"
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className={`bg-blue-800 hover:bg-blue-900 text-white ${isSubmitting ? "opacity-70" : ""}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Check"
        )}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
