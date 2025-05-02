
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
  // CRITICAL FIX: Make a deep copy of values to prevent any reference issues
  const formValues = JSON.parse(JSON.stringify(values));
  
  // IMPORTANT: Log the location ID at the start of mapping to verify it's present
  console.log('Mapping maintenance data with location_id:', formValues.location_id);
  
  if (!formValues.location_id) {
    console.error('WARNING: No location_id provided in form values during mapping');
  }
  
  // Base data common to all equipment types
  const baseData = {
    equipment_id: formValues.equipment_id,
    technician_id: formValues.technician_id,
    equipment_type: equipmentType,
    status: 'completed' as const,
    // CRITICAL FIX: Always use the user-selected location_id from form values
    // This ensures we don't override with equipment's default location
    location_id: formValues.location_id 
  };

  // Add check_date for new entries only
  const dateData = !isUpdate ? { check_date: new Date().toISOString() } : {};

  // Log the base data to verify location_id is included
  console.log('Base maintenance data:', baseData);

  // Combine base data with equipment-specific data
  const result = {
    ...baseData,
    ...dateData,
    ...mapStandardEquipmentData(formValues, equipmentType),
    ...mapElevatorData(formValues, equipmentType),
    ...mapRestroomData(formValues, equipmentType)
  };
  
  // CRITICAL FIX: Final verification to ensure location_id wasn't overwritten by any mapper
  console.log('Final data after mapping, location_id:', result.location_id, 'equipment_id:', result.equipment_id);
  
  if (result.location_id !== formValues.location_id) {
    console.error('LOCATION ID WAS CHANGED DURING MAPPING! Restoring user-selected value.');
    result.location_id = formValues.location_id;
  }
  
  return result;
};
