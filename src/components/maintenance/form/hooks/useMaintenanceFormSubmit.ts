
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceCheck } from "@/types/maintenance";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useMaintenanceFormSubmit = (
  onComplete: () => void,
  initialData?: MaintenanceCheck
) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues) => {
    try {
      console.log('Submitting form with values:', values);
      console.log('Update mode:', !!initialData);
      
      // Get equipment details to determine type
      const { data: equipment, error: equipmentError } = await supabase
        .from('equipment')
        .select('*')
        .eq('id', values.equipment_id)
        .maybeSingle();
      
      if (equipmentError) {
        console.error('Error fetching equipment:', equipmentError);
        throw new Error('Failed to fetch equipment details');
      }
      
      if (!equipment) {
        console.error('Equipment not found for ID:', values.equipment_id);
        throw new Error('Equipment not found');
      }
      
      // Determine equipment type directly from name
      const equipmentName = equipment.name.toLowerCase();
      let equipmentType: string;
      
      if (equipmentName.includes('ahu') || equipmentName.includes('air handler')) {
        equipmentType = 'ahu';
      } else if (equipmentName.includes('chiller')) {
        equipmentType = 'chiller';
      } else if (equipmentName.includes('cooling tower')) {
        equipmentType = 'cooling_tower';
      } else if (equipmentName.includes('elevator')) {
        equipmentType = 'elevator';
      } else if (equipmentName.includes('restroom')) {
        equipmentType = 'restroom';
      } else {
        equipmentType = 'general';
      }
      
      console.log('Detected equipment type:', equipmentType);
      
      const { selected_location, ...formData } = values;
      
      // Instead of querying pg_enum, we'll validate equipment type against known values
      const validEquipmentTypes = ['ahu', 'chiller', 'cooling_tower', 'elevator', 'restroom', 'general'];
      if (!validEquipmentTypes.includes(equipmentType)) {
        console.error('Invalid equipment type detected:', equipmentType);
        equipmentType = 'general'; // fallback to general if type is unknown
      }
      
      // Prepare the submission data properly based on equipment type
      let submissionData: any = {
        equipment_id: values.equipment_id,
        technician_id: values.technician_id,
        equipment_type: equipmentType,
        status: 'completed' as const
      };
      
      // Update check_date only for new entries, not for updates
      if (!initialData) {
        submissionData.check_date = new Date().toISOString();
      }
      
      // Helper function to handle empty strings and null values
      const processField = (value: any) => {
        if (value === "" || value === undefined) {
          return null;
        }
        return value;
      };
      
      // Handle equipment-specific data mapping
      if (equipmentType === 'elevator') {
        // Map elevator-specific fields
        submissionData = {
          ...submissionData,
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
      } else if (equipmentType === 'restroom') {
        // Map restroom-specific fields
        submissionData = {
          ...submissionData,
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
        };
      } else {
        // For other equipment types, map standard fields
        submissionData = {
          ...submissionData,
          // Convert string values to numbers where appropriate
          chiller_pressure_reading: 
            formData.chiller_pressure_reading === "NA" || !formData.chiller_pressure_reading ? 
            null : parseFloat(formData.chiller_pressure_reading),
            
          chiller_temperature_reading: 
            formData.chiller_temperature_reading === "NA" || !formData.chiller_temperature_reading ? 
            null : parseFloat(formData.chiller_temperature_reading),
            
          airflow_reading: 
            formData.airflow_reading === "NA" || !formData.airflow_reading ? 
            null : parseFloat(formData.airflow_reading),
          
          // Copy over standard fields
          air_filter_status: processField(formData.air_filter_status),
          belt_condition: processField(formData.belt_condition),
          refrigerant_level: processField(formData.refrigerant_level),
          unusual_noise: formData.unusual_noise ?? false,
          vibration_observed: formData.vibration_observed ?? false,
          oil_level_status: processField(formData.oil_level_status),
          condenser_condition: processField(formData.condenser_condition),
          notes: processField(formData.notes),
          
          // AHU specific fields
          air_filter_cleaned: formData.air_filter_cleaned ?? false,
          fan_belt_condition: processField(formData.fan_belt_condition),
          fan_bearings_lubricated: formData.fan_bearings_lubricated ?? false,
          fan_noise_level: processField(formData.fan_noise_level),
          dampers_operation: processField(formData.dampers_operation),
          coils_condition: processField(formData.coils_condition),
          sensors_operation: processField(formData.sensors_operation),
          motor_condition: processField(formData.motor_condition),
          drain_pan_status: processField(formData.drain_pan_status),
          airflow_unit: processField(formData.airflow_unit),
          troubleshooting_notes: processField(formData.troubleshooting_notes),
          corrective_actions: processField(formData.corrective_actions),
          maintenance_recommendations: processField(formData.maintenance_recommendations)
        };
      }

      console.log('Final submission data:', submissionData);
      console.log('Is update mode:', !!initialData);
      if (initialData) {
        console.log('Updating record with ID:', initialData.id);
      }

      // Use different approach for update vs insert
      let dbResponse;
      if (initialData) {
        console.log('Updating existing record:', initialData.id);
        dbResponse = await supabase
          .from('hvac_maintenance_checks')
          .update(submissionData)
          .eq('id', initialData.id);
      } else {
        console.log('Creating new record');
        dbResponse = await supabase
          .from('hvac_maintenance_checks')
          .insert(submissionData);
      }
      
      if (dbResponse.error) {
        console.error('Submission error:', dbResponse.error);
        throw dbResponse.error;
      }

      console.log('Submission successful!');
      
      toast({
        title: "Success",
        description: `Maintenance check ${initialData ? 'updated' : 'recorded'} successfully`,
      });
      
      onComplete();
    } catch (error) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'submit'} maintenance check. Please try again.`,
      });
    }
  };

  return handleSubmit;
};
