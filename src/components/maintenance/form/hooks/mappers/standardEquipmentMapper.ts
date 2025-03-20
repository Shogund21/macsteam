
import { processField, processNumberField } from "../utils/formValueProcessors";
import { MaintenanceFormValues } from "../useMaintenanceForm";

/**
 * Maps form values to standard HVAC equipment database fields
 */
export const mapStandardEquipmentData = (values: MaintenanceFormValues, equipmentType: string) => {
  // Skip if equipment is of specialized type
  if (equipmentType === 'elevator' || equipmentType === 'restroom') return {};
  
  return {
    // Convert string values to numbers where appropriate
    chiller_pressure_reading: processNumberField(values.chiller_pressure_reading),
    chiller_temperature_reading: processNumberField(values.chiller_temperature_reading),
    airflow_reading: processNumberField(values.airflow_reading),
    
    // Copy over standard fields
    air_filter_status: processField(values.air_filter_status),
    belt_condition: processField(values.belt_condition),
    refrigerant_level: processField(values.refrigerant_level),
    unusual_noise: values.unusual_noise ?? false,
    vibration_observed: values.vibration_observed ?? false,
    oil_level_status: processField(values.oil_level_status),
    condenser_condition: processField(values.condenser_condition),
    notes: processField(values.notes),
    
    // AHU specific fields
    air_filter_cleaned: values.air_filter_cleaned ?? false,
    fan_belt_condition: processField(values.fan_belt_condition),
    fan_bearings_lubricated: values.fan_bearings_lubricated ?? false,
    fan_noise_level: processField(values.fan_noise_level),
    dampers_operation: processField(values.dampers_operation),
    coils_condition: processField(values.coils_condition),
    sensors_operation: processField(values.sensors_operation),
    motor_condition: processField(values.motor_condition),
    drain_pan_status: processField(values.drain_pan_status),
    airflow_unit: processField(values.airflow_unit),
    troubleshooting_notes: processField(values.troubleshooting_notes),
    corrective_actions: processField(values.corrective_actions),
    maintenance_recommendations: processField(values.maintenance_recommendations)
  };
};
