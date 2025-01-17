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
        Object.entries(values).filter(([_, value]) => value !== undefined)
      );

      const submissionData = {
        ...cleanedValues,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        // Convert string values to numbers where needed
        chiller_pressure_reading: cleanedValues.chiller_pressure_reading ? 
          parseFloat(cleanedValues.chiller_pressure_reading as string) : null,
        chiller_temperature_reading: cleanedValues.chiller_temperature_reading ? 
          parseFloat(cleanedValues.chiller_temperature_reading as string) : null,
        airflow_reading: cleanedValues.airflow_reading ? 
          parseFloat(cleanedValues.airflow_reading as string) : null,
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