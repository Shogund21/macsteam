import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useMaintenanceSubmit = (onComplete: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues, equipmentType: string) => {
    try {
      console.log('Starting form submission with values:', values);

      // Validate required fields based on equipment type
      if (!values.equipment_id || !values.technician_id) {
        console.error('Missing required fields:', { 
          equipment_id: values.equipment_id, 
          technician_id: values.technician_id 
        });
        throw new Error('Missing required fields');
      }

      // Clean up undefined values and prepare data
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => 
          value !== undefined && 
          value !== '' && 
          value !== null
        )
      );

      console.log('Cleaned values:', cleanedValues);

      // Convert form values to the correct types
      const submissionData = {
        ...cleanedValues,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        
        // Handle numeric fields
        chiller_pressure_reading: cleanedValues.chiller_pressure_reading ? 
          parseFloat(cleanedValues.chiller_pressure_reading as string) : null,
        chiller_temperature_reading: cleanedValues.chiller_temperature_reading ? 
          parseFloat(cleanedValues.chiller_temperature_reading as string) : null,
        airflow_reading: cleanedValues.airflow_reading ? 
          parseFloat(cleanedValues.airflow_reading as string) : null,
        
        // Handle boolean fields
        unusual_noise: Boolean(cleanedValues.unusual_noise),
        vibration_observed: Boolean(cleanedValues.vibration_observed),
        air_filter_cleaned: Boolean(cleanedValues.air_filter_cleaned),
        fan_bearings_lubricated: Boolean(cleanedValues.fan_bearings_lubricated),
      };

      console.log('Prepared submission data:', submissionData);

      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully submitted maintenance check:', data);

      toast({
        title: "Success",
        description: "Maintenance check submitted successfully",
      });
      
      onComplete();
    } catch (error: any) {
      console.error('Error submitting maintenance check:', error);
      
      let errorMessage = 'Failed to submit maintenance check. ';
      if (error.message.includes('Missing required fields')) {
        errorMessage += 'Please fill in all required fields.';
      } else if (error.code === '23502') { // NOT NULL violation
        errorMessage += 'Some required fields are missing.';
      } else if (error.code === '23503') { // Foreign key violation
        errorMessage += 'Invalid equipment or technician selected.';
      } else {
        errorMessage += error.message;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return handleSubmit;
};