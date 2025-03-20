
import { processField } from "../utils/formValueProcessors";
import { MaintenanceFormValues } from "../useMaintenanceForm";

/**
 * Maps form values to elevator specific database fields
 */
export const mapElevatorData = (values: MaintenanceFormValues, equipmentType: string) => {
  if (equipmentType !== 'elevator') return {};
  
  return {
    // Copy elevator fields to the appropriate database fields
    elevator_operation: processField(values.elevator_operation),
    door_operation: processField(values.door_operation),
    emergency_phone: processField(values.emergency_phone),
    elevator_lighting: processField(values.elevator_lighting),
    elevator_notes: processField(values.elevator_notes),
    // Include general fields that might be used for reporting
    unusual_noise: values.unusual_noise_elevator ?? false,
    vibration_observed: values.vibration_elevator ?? false,
    notes: processField(values.elevator_notes)
  };
};
