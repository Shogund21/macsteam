
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
      
      // Use equipment type detection
      const equipmentName = equipment.name.toLowerCase();
      let equipmentType = 'general';
      
      if (equipmentName.includes('ahu') || equipmentName.includes('air handler')) {
        equipmentType = 'ahu';
      } else if (equipmentName.includes('cooling tower')) {
        equipmentType = 'cooling_tower';
      } else if (equipmentName.includes('elevator')) {
        equipmentType = 'elevator';
      } else if (equipmentName.includes('restroom')) {
        equipmentType = 'restroom';
      } else if (equipmentName.includes('chiller')) {
        equipmentType = 'chiller';
      }
      
      console.log('Detected equipment type:', equipmentType);
      
      const { selected_location, ...formData } = values;
      
      // Prepare submission data
      const submissionData: Database['public']['Tables']['hvac_maintenance_checks']['Insert'] = {
        ...formData,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        status: 'completed' as const,
        
        // Convert string values to numbers, handling "NA" cases
        chiller_pressure_reading: values.chiller_pressure_reading === "NA" ? null : 
          parseFloat(values.chiller_pressure_reading || "0") || null,
        chiller_temperature_reading: values.chiller_temperature_reading === "NA" ? null : 
          parseFloat(values.chiller_temperature_reading || "0") || null,
        airflow_reading: values.airflow_reading === "NA" ? null : 
          parseFloat(values.airflow_reading || "0") || null,
      };
      
      // Handle equipment-specific fields
      if (equipmentType === 'elevator') {
        console.log('Processing elevator-specific fields');
        // Make sure to copy the field values explicitly
        submissionData.unusual_noise = values.unusual_noise_elevator;
        submissionData.vibration_observed = values.vibration_elevator;
        submissionData.notes = values.elevator_notes || values.notes;
      } else if (equipmentType === 'restroom') {
        console.log('Processing restroom-specific fields');
        // Make sure to save restroom notes to the general notes field
        submissionData.notes = values.restroom_notes || values.notes;
      }

      console.log('Final submission data:', submissionData);

      let dbResponse;
      if (initialData) {
        dbResponse = await supabase
          .from('hvac_maintenance_checks')
          .update(submissionData)
          .eq('id', initialData.id);
      } else {
        dbResponse = await supabase
          .from('hvac_maintenance_checks')
          .insert(submissionData);
      }
      
      if (dbResponse.error) {
        console.error('Submission error:', dbResponse.error);
        throw dbResponse.error;
      }

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
