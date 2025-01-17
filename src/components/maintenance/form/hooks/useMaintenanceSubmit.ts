import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useMaintenanceSubmit = (onComplete: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues, equipmentType: string) => {
    try {
      console.log('Starting form submission with values:', values);

      // Clean up undefined values and prepare data
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== undefined && value !== '')
      );

      // Convert form values to the correct types
      const submissionData = {
        ...cleanedValues,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        // Handle numeric fields
        chiller_pressure_reading: cleanedValues.chiller_pressure_reading ? 
          parseFloat(String(cleanedValues.chiller_pressure_reading)) : null,
        chiller_temperature_reading: cleanedValues.chiller_temperature_reading ? 
          parseFloat(String(cleanedValues.chiller_temperature_reading)) : null,
        airflow_reading: cleanedValues.airflow_reading ? 
          parseFloat(String(cleanedValues.airflow_reading)) : null,
        // Ensure boolean fields are properly set
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
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to submit maintenance check: ${error.message}`,
      });
    }
  };

  return handleSubmit;
};