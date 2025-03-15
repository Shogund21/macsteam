
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceCheck } from "@/types/maintenance";
import { MaintenanceFormValues } from "./useMaintenanceForm";
import { Database } from "@/integrations/supabase/types";

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
      
      // Filter out fields that don't exist in the database
      const {
        unusual_noise_elevator,
        vibration_elevator,
        elevator_notes,
        restroom_notes,
        door_operation,
        elevator_operation,
        emergency_phone,
        elevator_lighting,
        sink_status,
        toilet_status,
        urinal_status,
        hand_dryer_status,
        cleanliness_level,
        soap_supply,
        toilet_paper_supply,
        floor_condition,
        ...validDbFields
      } = formData;
      
      // Prepare submission data with proper type conversions
      const submissionData: Database['public']['Tables']['hvac_maintenance_checks']['Insert'] = {
        ...validDbFields,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        status: 'completed' as const,
        
        // Convert string values to numbers, handling empty and "NA" cases
        chiller_pressure_reading: 
          validDbFields.chiller_pressure_reading === "NA" || !validDbFields.chiller_pressure_reading ? 
          null : parseFloat(validDbFields.chiller_pressure_reading),
          
        chiller_temperature_reading: 
          validDbFields.chiller_temperature_reading === "NA" || !validDbFields.chiller_temperature_reading ? 
          null : parseFloat(validDbFields.chiller_temperature_reading),
          
        airflow_reading: 
          validDbFields.airflow_reading === "NA" || !validDbFields.airflow_reading ? 
          null : parseFloat(validDbFields.airflow_reading),
      };
      
      // Handle equipment-specific fields depending on equipment type
      if (equipmentType === 'elevator') {
        console.log('Processing elevator-specific fields');
        // Copy elevator-specific fields to the appropriate fields in the main record
        submissionData.unusual_noise = unusual_noise_elevator;
        submissionData.vibration_observed = vibration_elevator;
        submissionData.notes = elevator_notes || validDbFields.notes || null;
      } else if (equipmentType === 'restroom') {
        console.log('Processing restroom-specific fields');
        // Make sure to save restroom notes to the general notes field
        submissionData.notes = restroom_notes || validDbFields.notes || null;
      } else {
        // For other equipment types, use the general notes
        submissionData.notes = validDbFields.notes || null;
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
