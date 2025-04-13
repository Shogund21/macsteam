
import { Button } from "@/components/ui/button";
import { buttonStyles } from "./ButtonStyles";

export interface ActionButtonsProps {
  onCancel: () => void;
  cancelText?: string;
  submitText?: string;
  isSubmitting?: boolean;
  isProcessing?: boolean;
  processingText?: string;
  variant?: keyof typeof buttonStyles;
  customSubmit?: boolean;
  onSubmitClick?: () => void;
}

export const ActionButtons = ({
  onCancel,
  cancelText = "Cancel",
  submitText = "Submit",
  isSubmitting = false,
  isProcessing = false,
  processingText,
  variant = "primary",
  customSubmit = false,
  onSubmitClick
}: ActionButtonsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelText}
      </Button>
      <Button 
        type={customSubmit ? "button" : "submit"}
        onClick={customSubmit && onSubmitClick ? onSubmitClick : undefined}
        disabled={isSubmitting || isProcessing}
        className={buttonStyles[variant]}
      >
        {isSubmitting || isProcessing 
          ? processingText || "Processing..." 
          : submitText}
      </Button>
    </div>
  );
};
