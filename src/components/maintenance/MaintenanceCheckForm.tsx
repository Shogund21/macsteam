import React from "react";
import { useMaintenanceForm } from "./form/hooks/useMaintenanceForm";
import { useMaintenanceSubmit } from "./form/hooks/useMaintenanceSubmit";
import { useMaintenanceData } from "./form/hooks/useMaintenanceData";
import MaintenanceFormContent from "./form/MaintenanceFormContent";
import FormActions from "./form/FormActions";
import ErrorState from "./form/ErrorState";
import FormContainer from "./form/FormContainer";
import EquipmentTypeHandler from "./form/EquipmentTypeHandler";
import ValidationHandler from "./form/ValidationHandler";

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const form = useMaintenanceForm();
  const handleSubmit = useMaintenanceSubmit(onComplete);
  const { equipment, technicians, error } = useMaintenanceData();

  const onSubmit = async (values: any) => {
    try {
      console.log('Form submitted with values:', values);
      
      const selectedEquipment = equipment?.find((eq) => eq.id === values.equipment_id);
      if (!selectedEquipment) {
        console.error('No equipment selected');
        return;
      }

      const equipmentType = selectedEquipment.name.toLowerCase().includes('ahu') 
        ? 'ahu' 
        : selectedEquipment.name.toLowerCase().includes('cooling tower')
          ? 'cooling_tower'
          : 'general';

      await handleSubmit(values, equipmentType);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  if (error) {
    return <ErrorState />;
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <EquipmentTypeHandler equipment={equipment || []} watch={form.watch}>
        {({ isAHU, isCoolingTower, selectedEquipment }) => (
          <ValidationHandler form={form} isAHU={isAHU} isCoolingTower={isCoolingTower}>
            {(isValid) => (
              <>
                <MaintenanceFormContent
                  form={form}
                  equipment={equipment || []}
                  technicians={technicians || []}
                  isAHU={isAHU}
                  isCoolingTower={isCoolingTower}
                />
                <FormActions 
                  onCancel={onComplete}
                  isValid={isValid}
                />
              </>
            )}
          </ValidationHandler>
        )}
      </EquipmentTypeHandler>
    </FormContainer>
  );
};

export default MaintenanceCheckForm;