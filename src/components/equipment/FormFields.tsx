import { UseFormReturn } from "react-hook-form";
import { EquipmentFormValues } from "./types";
import EquipmentTypeField from "./form-fields/EquipmentTypeField";
import OptionalTextField from "./form-fields/OptionalTextField";

interface FormFieldsProps {
  form: UseFormReturn<EquipmentFormValues>;
}

const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <EquipmentTypeField form={form} />
      
      <OptionalTextField
        form={form}
        name="model"
        label="Model"
        placeholder="Enter model"
      />

      <OptionalTextField
        form={form}
        name="serialNumber"
        label="Serial Number"
        placeholder="Enter serial number"
      />

      <OptionalTextField
        form={form}
        name="status"
        label="Status"
        placeholder="Enter status"
      />
    </>
  );
};

export default FormFields;