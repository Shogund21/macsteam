import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useFormValidation = (
  form: UseFormReturn<MaintenanceFormValues>,
  isAHU: boolean,
  isCoolingTower: boolean
) => {
  const isFormValid = () => {
    const values = form.getValues();
    console.log("Form values being validated:", values);
    
    // Basic validation for required fields
    if (!values.equipment_id || !values.technician_id) {
      console.log("Basic fields missing:", { equipment_id: values.equipment_id, technician_id: values.technician_id });
      return false;
    }

    // Equipment-specific validation
    if (isAHU) {
      const ahuValid = !!(
        values.air_filter_status &&
        values.fan_belt_condition &&
        values.dampers_operation &&
        values.coils_condition
      );
      console.log("AHU validation result:", ahuValid);
      return ahuValid;
    } 
    
    if (isCoolingTower) {
      const coolingTowerValid = !!(
        values.water_system_status &&
        values.fill_media_condition &&
        values.fan_assembly_status
      );
      console.log("Cooling Tower validation result:", coolingTowerValid);
      return coolingTowerValid;
    }
    
    // General equipment validation
    const generalValid = !!(
      values.chiller_pressure_reading &&
      values.chiller_temperature_reading &&
      values.air_filter_status &&
      values.belt_condition
    );
    console.log("General equipment validation result:", generalValid);
    return generalValid;
  };

  return { isFormValid };
};