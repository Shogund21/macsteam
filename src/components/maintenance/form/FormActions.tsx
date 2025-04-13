
import { ActionButtons, ActionButtonsProps } from "@/components/common/ActionButtons";

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
  console.log('FormActions render:', { isEditing, isSubmitting });
  
  // Custom props for ActionButtons
  const actionProps: Partial<ActionButtonsProps> = {
    onCancel,
    isSubmitting,
    variant: "secondary",
    submitText: isEditing ? 'Update Maintenance Check' : 'Submit Maintenance Check',
    processingText: isEditing ? 'Updating...' : 'Saving...',
  };
  
  // If there's a custom onSubmit handler, we need to create a custom button
  if (onSubmit) {
    return (
      <div className="flex flex-col md:flex-row justify-end gap-2 pt-4 border-t">
        <ActionButtons 
          {...actionProps}
          customSubmit={true}
          onSubmitClick={onSubmit}
        />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row justify-end gap-2 pt-4 border-t">
      <ActionButtons {...actionProps} />
    </div>
  );
};

export default FormActions;
