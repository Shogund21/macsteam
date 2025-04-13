
import { useNavigate } from "react-router-dom";
import { ActionButtons } from "@/components/common/ActionButtons";

const FormActions = () => {
  const navigate = useNavigate();

  return (
    <ActionButtons
      onCancel={() => navigate("/equipment")}
      submitText="Add Equipment"
      variant="secondary"
    />
  );
};

export default FormActions;
