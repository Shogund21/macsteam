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
      const submissionData = {
        ...values,
        chiller_pressure_reading: values.chiller_pressure_reading === "NA" ? null : parseFloat(values.chiller_pressure_reading),
        chiller_temperature_reading: values.chiller_temperature_reading === "NA" ? null : parseFloat(values.chiller_temperature_reading),
        airflow_reading: values.airflow_reading === "NA" ? null : parseFloat(values.airflow_reading),
      };

      const { error } = initialData 
        ? await supabase
            .from('hvac_maintenance_checks')
            .update(submissionData)
            .eq('id', initialData.id)
        : await supabase
            .from('hvac_maintenance_checks')
            .insert(submissionData);

      if (error) throw error;

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