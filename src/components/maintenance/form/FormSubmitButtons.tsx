
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
      >
        Cancel
      </Button>
      <Button 
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className={`bg-[#1EAEDB] hover:bg-[#33C3F0] text-white ${isSubmitting ? "opacity-70" : ""}`}
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
