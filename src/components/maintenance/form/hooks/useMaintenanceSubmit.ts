import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";

// Helper function to parse numeric values
const parseFloatOrNull = (value: any): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? null : parsed;
};

// Helper function to ensure boolean values
const toBooleanOrNull = (value: any): boolean | null => {
  if (value === null || value === undefined || value === '') return null;
  return Boolean(value);
};

export const useMaintenanceSubmit = (onComplete: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues, equipmentType: string) => {
    try {
      console.log('Starting form submission with values:', values);

      // Validate required fields
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
        chiller_pressure_reading: parseFloatOrNull(cleanedValues.chiller_pressure_reading),
        chiller_temperature_reading: parseFloatOrNull(cleanedValues.chiller_temperature_reading),
        airflow_reading: parseFloatOrNull(cleanedValues.airflow_reading),
        
        // Handle boolean fields
        unusual_noise: toBooleanOrNull(cleanedValues.unusual_noise),
        vibration_observed: toBooleanOrNull(cleanedValues.vibration_observed),
        air_filter_cleaned: toBooleanOrNull(cleanedValues.air_filter_cleaned),
        fan_bearings_lubricated: toBooleanOrNull(cleanedValues.fan_bearings_lubricated),
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
      
      // Provide more specific error messages
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