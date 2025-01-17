import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useFormValidation = (
  form: UseFormReturn<MaintenanceFormValues>,
  isAHU: boolean,
  isCoolingTower: boolean
) => {
  const isFormValid = () => {
    const values = form.getValues();
    
    // Basic validation for required fields
    if (!values.equipment_id || !values.technician_id) {
      return false;
    }

    // Equipment-specific validation
    if (isAHU) {
      return !!(values.air_filter_status && values.fan_belt_condition);
    } 
    
    if (isCoolingTower) {
      return !!(values.water_system_status && values.fill_media_condition);
    }
    
    // General equipment validation
    return !!(values.chiller_pressure_reading && values.chiller_temperature_reading);
  };

  return { isFormValid };
};