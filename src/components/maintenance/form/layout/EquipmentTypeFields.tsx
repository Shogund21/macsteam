
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();

  // MOBILE DEBUG: Enhanced logging for equipment type fields rendering
  console.log('EquipmentTypeFields MOBILE DEBUG - Rendering Analysis:', { 
    equipmentType, 
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    equipmentId: form.watch('equipment_id'),
    hasEquipmentType: !!equipmentType,
    willRenderFields: !!equipmentType,
    timestamp: new Date().toISOString()
  });

  // MOBILE FIX: Ensure we always render when we have an equipment type
  if (!equipmentType) {
    console.log('EquipmentTypeFields: ❌ MOBILE - No equipment type detected, not rendering fields');
    return null;
  }

  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
      data-equipment-type={equipmentType}
      data-mobile={isMobile}
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1
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
