
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import MaintenanceBasicInfo from "./MaintenanceBasicInfo";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import { useMaintenanceForm } from "./hooks/useMaintenanceForm";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
  const { toast } = useToast();

  const { data: equipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true);
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const { selected_location, ...formData } = values;
      
      // Get equipment details to determine type
      const selectedEquipment = equipment?.find(eq => eq.id === values.equipment_id);
      const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
      
      const submissionData = {
        ...formData,
        equipment_type: isAHU ? 'ahu' : 'general',
        check_date: new Date().toISOString(),
        status: 'completed',
        // Handle numeric fields
        chiller_pressure_reading: formData.chiller_pressure_reading ? 
          parseFloat(formData.chiller_pressure_reading) : null,
        chiller_temperature_reading: formData.chiller_temperature_reading ? 
          parseFloat(formData.chiller_temperature_reading) : null,
        airflow_reading: formData.airflow_reading ? 
          parseFloat(formData.airflow_reading) : null,
      };

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert([submissionData]);

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

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment || []} 
          technicians={technicians || []} 
        />
        
        {isAHU ? (
          <AHUMaintenanceFields form={form} />
        ) : (
          <>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit Check
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
