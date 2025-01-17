import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useFormValidation = (
  form: UseFormReturn<MaintenanceFormValues>,
  isAHU: boolean,
  isCoolingTower: boolean
) => {
  const isFormValid = () => {
    const values = form.getValues();
    const errors = form.formState.errors;
    
    console.log("Form validation - Current values:", values);
    console.log("Form validation - Current errors:", errors);
    
    // Basic validation for required fields
    if (!values.equipment_id || !values.technician_id) {
      console.log("Basic fields missing:", { 
        equipment_id: values.equipment_id, 
        technician_id: values.technician_id 
      });
      return false;
    }

    // Equipment-specific validation
    if (isAHU) {
      if (!values.air_filter_status || !values.fan_belt_condition || 
          !values.dampers_operation || !values.coils_condition) {
        console.log("AHU validation failed - missing required fields");
        return false;
      }
      return true;
    } 
    
    if (isCoolingTower) {
      if (!values.water_system_status || !values.fill_media_condition || 
          !values.fan_assembly_status) {
        console.log("Cooling Tower validation failed - missing required fields");
        return false;
      }
      return true;
    }
    
    // General equipment validation
    const generalValid = !!(
      values.chiller_pressure_reading &&
      values.chiller_temperature_reading &&
      values.air_filter_status &&
      values.belt_condition &&
      values.refrigerant_level &&
      values.oil_level_status &&
      values.condenser_condition
    );

    console.log("General equipment validation result:", generalValid, {
      chiller_pressure_reading: values.chiller_pressure_reading,
      chiller_temperature_reading: values.chiller_temperature_reading,
      air_filter_status: values.air_filter_status,
      belt_condition: values.belt_condition,
      refrigerant_level: values.refrigerant_level,
      oil_level_status: values.oil_level_status,
      condenser_condition: values.condenser_condition
    });

    return generalValid;
  };

  return { isFormValid };
};