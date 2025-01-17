import React from "react";
import { Form } from "@/components/ui/form";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceSubmit } from "./form/hooks/useMaintenanceSubmit";
import { useFormValidation } from "./form/hooks/useFormValidation";
import { useMaintenanceData } from "./form/hooks/useMaintenanceData";
import MaintenanceFormContent from "./form/MaintenanceFormContent";
import FormActions from "./form/FormActions";
import ErrorState from "./form/ErrorState";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
  const handleSubmit = useMaintenanceSubmit(onComplete);
  const { equipment, technicians, error } = useMaintenanceData();

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );
  console.log('Selected equipment:', selectedEquipment);

  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isCoolingTower = selectedEquipment?.name.toLowerCase().includes('cooling tower');
  console.log('Equipment type:', { isAHU, isCoolingTower });
  
  const { isFormValid } = useFormValidation(form, !!isAHU, !!isCoolingTower);

  const onSubmit = async (values: any) => {
    try {
      console.log('Form submitted with values:', values);
      console.log('Form validation state:', form.formState);
      
      if (!selectedEquipment) {
        console.error('No equipment selected');
        return;
      }

      const equipmentType = isAHU ? 'ahu' : isCoolingTower ? 'cooling_tower' : 'general';
      console.log('Submitting with equipment type:', equipmentType);
      
      await handleSubmit(values, equipmentType);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  const formIsValid = isFormValid();
  console.log('Form validity:', formIsValid);
  console.log('Form errors:', form.formState.errors);

  if (error) {
    return <ErrorState />;
  }

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