
import { MaintenanceFormValues } from "../schema/maintenanceFormSchema";
import { mapElevatorData } from "../mappers/elevatorDataMapper";
import { mapRestroomData } from "../mappers/restroomDataMapper";
import { mapStandardEquipmentData } from "../mappers/standardEquipmentMapper";

/**
 * Maps form values to appropriate database fields based on equipment type
 */
export const mapMaintenanceData = (
  values: MaintenanceFormValues, 
  equipmentType: string,
  isUpdate: boolean
) => {
  // IMPORTANT: Log the location ID at the start of mapping to verify it's present
  console.log('Mapping maintenance data with location_id:', values.location_id);
  
  if (!values.location_id) {
    console.error('WARNING: No location_id provided in form values during mapping');
  }
  
  // Base data common to all equipment types
  const baseData = {
    equipment_id: values.equipment_id,
    technician_id: values.technician_id,
    equipment_type: equipmentType,
    status: 'completed' as const,
    // CRITICAL FIX: Always use the user-selected location_id from form values
    // This ensures we don't override with equipment's default location
    location_id: values.location_id 
  };

  // Add check_date for new entries only
  const dateData = !isUpdate ? { check_date: new Date().toISOString() } : {};

  // Log the base data to verify location_id is included
  console.log('Base maintenance data:', baseData);

  // Combine base data with equipment-specific data
  // The equipment-specific mappers should NOT override location_id
  return {
    ...baseData,
    ...dateData,
    ...mapStandardEquipmentData(values, equipmentType),
    ...mapElevatorData(values, equipmentType),
    ...mapRestroomData(values, equipmentType)
  };
};
