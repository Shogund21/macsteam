import { useFormValidation } from "./hooks/useFormValidation";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";

interface ValidationHandlerProps {
  form: UseFormReturn<MaintenanceFormValues>;
  isAHU: boolean;
  isCoolingTower: boolean;
  children: (isValid: boolean) => React.ReactNode;
}

const ValidationHandler = ({ form, isAHU, isCoolingTower, children }: ValidationHandlerProps) => {
  const { isFormValid } = useFormValidation(form, isAHU, isCoolingTower);
  const formIsValid = isFormValid();
  
  console.log("Form validity:", formIsValid);
  console.log("Form errors:", form.formState.errors);

  return <>{children(formIsValid)}</>;
};

export default ValidationHandler;