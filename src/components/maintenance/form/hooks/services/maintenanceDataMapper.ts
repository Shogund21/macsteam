
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
  console.log('Mapping maintenance data with location_id:', values.location_id);
  
  // Base data common to all equipment types
  // Always include location_id - this is a required field now
  const baseData = {
    equipment_id: values.equipment_id,
    technician_id: values.technician_id,
    equipment_type: equipmentType,
    status: 'completed' as const,
    // Ensure location_id is always included
    location_id: values.location_id
  };

  // Add check_date for new entries only
  const dateData = !isUpdate ? { check_date: new Date().toISOString() } : {};

  // Log the base data to verify location_id is included
  console.log('Base maintenance data:', baseData);

  // Combine base data with equipment-specific data
  return {
    ...baseData,
    ...dateData,
    ...mapStandardEquipmentData(values, equipmentType),
    ...mapElevatorData(values, equipmentType),
    ...mapRestroomData(values, equipmentType)
  };
};
