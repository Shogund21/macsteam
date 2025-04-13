
import { useNavigate } from "react-router-dom";
import { ActionButtons } from "@/components/common/ActionButtons";

interface FormActionsProps {
  isSubmitting: boolean;
}

export const FormActions = ({ isSubmitting }: FormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <ActionButtons
      onCancel={() => navigate("/projects")}
      submitText="Add Project"
      processingText="Adding..."
      isSubmitting={isSubmitting}
      variant="primary"
    />
  );
};
