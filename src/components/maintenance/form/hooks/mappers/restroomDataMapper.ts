
import { processField } from "../utils/formValueProcessors";
import { MaintenanceFormValues } from "../schema/maintenanceFormSchema";

/**
 * Maps form values to restroom specific database fields
 */
export const mapRestroomData = (values: MaintenanceFormValues, equipmentType: string) => {
  if (equipmentType !== 'restroom') return {};
  
  // CRITICAL FIX: Log the location_id to ensure it's not being overridden
  console.log('In restroomDataMapper - Using user-selected location_id:', values.location_id);

  // Only map restroom-specific fields, NEVER override location_id here
  return {
    // Map restroom-specific fields to database columns
    sink_status: processField(values.sink_status),
    toilet_status: processField(values.toilet_status),
    urinal_status: processField(values.urinal_status),
    hand_dryer_status: processField(values.hand_dryer_status),
    cleanliness_level: processField(values.cleanliness_level),
    soap_supply: processField(values.soap_supply),
    toilet_paper_supply: processField(values.toilet_paper_supply),
    floor_condition: processField(values.floor_condition),
    restroom_notes: processField(values.restroom_notes),
    // Store restroom notes in the general notes field as well
    notes: processField(values.restroom_notes)
    // CRITICAL FIX: Restroom mapper should NEVER assign location_id
  };
};
