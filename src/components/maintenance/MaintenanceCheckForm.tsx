import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceSubmit } from "./form/hooks/useMaintenanceSubmit";
import { useFormValidation } from "./form/hooks/useFormValidation";
import MaintenanceFormContent from "./form/MaintenanceFormContent";
import FormActions from "./form/FormActions";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
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
  console.log('Selected equipment:', selectedEquipment);

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isCoolingTower = selectedEquipment?.name.toLowerCase().includes('cooling tower');
  console.log('Equipment type:', { isAHU, isCoolingTower });
  
  const { isFormValid } = useFormValidation(form, !!isAHU, !!isCoolingTower);

  const onSubmit = async (values: any) => {
    console.log('Form submitted with values:', values);
    const equipmentType = isAHU ? 'ahu' : isCoolingTower ? 'cooling_tower' : 'general';
    await handleSubmit(values, equipmentType);
  };

  const formIsValid = isFormValid();
  console.log('Form validity:', formIsValid);

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

        <FormActions 
          onCancel={onComplete}
          isValid={formIsValid}
        />
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;