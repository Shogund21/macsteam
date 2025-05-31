
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

  // Always render equipment fields regardless of mobile status
  // The component will handle mobile-specific styling internally
  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
      style={{ 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        width: '100%',
        minHeight: 'auto'
      }}
    >
      <EquipmentFields 
        form={form} 
        equipmentType={equipmentType}
      />
    </div>
  );
};

export default EquipmentTypeFields;
