import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceSubmit } from "./form/hooks/useMaintenanceSubmit";
import MaintenanceFormContent from "./form/MaintenanceFormContent";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
  const { toast } = useToast();
  const handleSubmit = useMaintenanceSubmit(onComplete);

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

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isCoolingTower = selectedEquipment?.name.toLowerCase().includes('cooling tower');

  const onSubmit = async (values: any) => {
    try {
      const submissionData = {
        ...values,
        equipment_type: isAHU ? 'ahu' : isCoolingTower ? 'cooling_tower' : 'general',
        check_date: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert(submissionData);

      if (error) throw error;

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <MaintenanceFormContent
          form={form}
          equipment={equipment || []}
          technicians={technicians || []}
          isAHU={!!isAHU}
          isCoolingTower={!!isCoolingTower}
        />

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