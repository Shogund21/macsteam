import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useMaintenanceSubmit = (onComplete: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues) => {
    try {
      const submissionData = {
        ...values,
        equipment_type: values.equipment_type || 'general',
        chiller_pressure_reading: parseFloat(values.chiller_pressure_reading),
        chiller_temperature_reading: parseFloat(values.chiller_temperature_reading),
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
      };

      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Maintenance check recorded successfully",
      });
      onComplete();
    } catch (error) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit maintenance check. Please try again.",
      });
    }
  };

  return handleSubmit;
};