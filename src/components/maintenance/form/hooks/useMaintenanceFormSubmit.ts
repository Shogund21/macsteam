
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceCheck } from "@/types/maintenance";
import { MaintenanceFormValues } from "./useMaintenanceForm";
import { Database } from "@/integrations/supabase/types";
import useEquipmentTypeDetection from "./useEquipmentTypeDetection";

export const useMaintenanceFormSubmit = (
  onComplete: () => void,
  initialData?: MaintenanceCheck
) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues) => {
    try {
      console.log('Submitting form with values:', values);
      
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
      // For elevator and restroom, we need to handle their specific fields differently
      let submissionData: any = {
        equipment_id: values.equipment_id,
        technician_id: values.technician_id,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        status: 'completed' as const
      };
      
      // Handle equipment-specific data mapping
      if (equipmentType === 'elevator') {
        // Map elevator-specific fields
        submissionData = {
          ...submissionData,
          // Copy elevator fields to the appropriate database fields
          elevator_operation: values.elevator_operation ?? null,
          door_operation: values.door_operation ?? null,
          emergency_phone: values.emergency_phone ?? null,
          elevator_lighting: values.elevator_lighting ?? null,
          elevator_notes: values.elevator_notes ?? null,
          // Include general fields that might be used for reporting
          unusual_noise: values.unusual_noise_elevator ?? false,
          vibration_observed: values.vibration_elevator ?? false,
          notes: values.elevator_notes ?? null
        };
      } else if (equipmentType === 'restroom') {
        // Map restroom-specific fields
        submissionData = {
          ...submissionData,
          // Map restroom-specific fields to database columns
          sink_status: values.sink_status ?? null,
          toilet_status: values.toilet_status ?? null,
          urinal_status: values.urinal_status ?? null,
          hand_dryer_status: values.hand_dryer_status ?? null,
          cleanliness_level: values.cleanliness_level ?? null,
          soap_supply: values.soap_supply ?? null,
          toilet_paper_supply: values.toilet_paper_supply ?? null,
          floor_condition: values.floor_condition ?? null,
          restroom_notes: values.restroom_notes ?? null,
          // Store restroom notes in the general notes field as well
          notes: values.restroom_notes ?? null
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
          air_filter_status: formData.air_filter_status ?? null,
          belt_condition: formData.belt_condition ?? null,
          refrigerant_level: formData.refrigerant_level ?? null,
          unusual_noise: formData.unusual_noise ?? false,
          vibration_observed: formData.vibration_observed ?? false,
          oil_level_status: formData.oil_level_status ?? null,
          condenser_condition: formData.condenser_condition ?? null,
          notes: formData.notes ?? null,
          
          // AHU specific fields
          air_filter_cleaned: formData.air_filter_cleaned ?? false,
          fan_belt_condition: formData.fan_belt_condition ?? null,
          fan_bearings_lubricated: formData.fan_bearings_lubricated ?? false,
          fan_noise_level: formData.fan_noise_level ?? null,
          dampers_operation: formData.dampers_operation ?? null,
          coils_condition: formData.coils_condition ?? null,
          sensors_operation: formData.sensors_operation ?? null,
          motor_condition: formData.motor_condition ?? null,
          drain_pan_status: formData.drain_pan_status ?? null,
          airflow_unit: formData.airflow_unit ?? null,
          troubleshooting_notes: formData.troubleshooting_notes ?? null,
          corrective_actions: formData.corrective_actions ?? null,
          maintenance_recommendations: formData.maintenance_recommendations ?? null
        };
      }

      console.log('Final submission data:', submissionData);

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
