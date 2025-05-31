
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();

  console.log('EquipmentTypeFields rendering:', { 
    equipmentType, 
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    equipmentId: form.watch('equipment_id')
  });

  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
    >
      <EquipmentFields 
        form={form} 
        equipmentType={equipmentType}
      />
    </div>
  );
};

export default EquipmentTypeFields;
