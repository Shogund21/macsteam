import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceFormValues } from "./useMaintenanceForm";

export const useMaintenanceSubmit = (onComplete: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (values: MaintenanceFormValues, equipmentType: string) => {
    try {
      console.log('Form values before submission:', values);

      const submissionData = {
        ...values,
        equipment_type: equipmentType,
        check_date: new Date().toISOString(),
        chiller_pressure_reading: values.chiller_pressure_reading ? parseFloat(values.chiller_pressure_reading) : null,
        chiller_temperature_reading: values.chiller_temperature_reading ? parseFloat(values.chiller_temperature_reading) : null,
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
      };

      console.log('Submitting maintenance check:', submissionData);

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

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
        description: "Failed to submit maintenance check: " + error.message,
      });
    }
  };

  return handleSubmit;
};