import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import MaintenanceBasicInfo from "./form/MaintenanceBasicInfo";
import MaintenanceReadings from "./form/MaintenanceReadings";
import MaintenanceStatus from "./form/MaintenanceStatus";
import MaintenanceObservations from "./form/MaintenanceObservations";
import AHUMaintenanceFields from "./form/AHUMaintenanceFields";
import DocumentManager from "./documents/DocumentManager";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useMaintenanceForm();

  const { data: equipment = [], isLoading: isLoadingEquipment, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      console.log('Fetching equipment...');
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      
      console.log('Fetched equipment data:', data);
      return data || [];
    },
  });

  const { data: technicians = [], isLoading: isLoadingTechnicians, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      console.log('Fetching technicians...');
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true)
        .order('firstName');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      
      console.log('Fetched technicians data:', data);
      return data || [];
    },
  });

  // Handle query errors
  if (equipmentError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load equipment. Please try again.",
    });
  }

  if (techniciansError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load technicians. Please try again.",
    });
  }

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');

  const onSubmit = async (values: any) => {
    try {
      const submissionData = {
        ...values,
        equipment_type: isAHU ? 'ahu' : 'general',
        chiller_pressure_reading: parseFloat(values.chiller_pressure_reading),
        chiller_temperature_reading: parseFloat(values.chiller_temperature_reading),
        airflow_reading: values.airflow_reading ? parseFloat(values.airflow_reading) : null,
      };

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

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

  if (isLoadingEquipment || isLoadingTechnicians) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
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

        <DocumentManager equipmentId={form.watch('equipment_id')} />

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