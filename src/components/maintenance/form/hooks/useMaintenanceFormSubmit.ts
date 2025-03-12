
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
      const { data: equipment } = await supabase
        .from('equipment')
        .select('name')
        .eq('id', values.equipment_id)
        .single();
      
      const isAHU = equipment?.name?.toLowerCase().includes('ahu') || false;
      
      const { selected_location, ...formData } = values;
      
      const submissionData: Database['public']['Tables']['hvac_maintenance_checks']['Insert'] = {
        ...formData,
        equipment_type: isAHU ? 'ahu' : 'general',
        check_date: new Date().toISOString(),
        status: 'completed' as const,
        // Convert string values to numbers, handling "NA" cases
        chiller_pressure_reading: values.chiller_pressure_reading === "NA" ? null : parseFloat(values.chiller_pressure_reading || "0"),
        chiller_temperature_reading: values.chiller_temperature_reading === "NA" ? null : parseFloat(values.chiller_temperature_reading || "0"),
        airflow_reading: values.airflow_reading === "NA" ? null : parseFloat(values.airflow_reading || "0"),
      };

      console.log('Submitting to database:', submissionData);

      const { error } = initialData 
        ? await supabase
            .from('hvac_maintenance_checks')
            .update(submissionData)
            .eq('id', initialData.id)
        : await supabase
            .from('hvac_maintenance_checks')
            .insert(submissionData);

      if (error) {
        console.error('Submission error:', error);
        throw error;
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
