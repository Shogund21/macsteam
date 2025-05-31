
import React, { useEffect } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');
  
  console.log('EquipmentTypeFields: 🔧 COMPREHENSIVE DEBUG:', { 
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    formEquipmentId: equipmentId,
    isMobile,
    hasEquipmentId: !!equipmentId,
    timestamp: new Date().toISOString()
  });

  // Add effect to monitor equipment type changes
  useEffect(() => {
    console.log('EquipmentTypeFields: 🔄 EQUIPMENT TYPE EFFECT TRIGGERED:', {
      newEquipmentType: equipmentType,
      selectedEquipment: selectedEquipment?.name,
      isMobile,
      shouldRender: !!equipmentId && !!equipmentType
    });
  }, [equipmentType, selectedEquipment, isMobile, equipmentId]);

  // Early return if no equipment selected
  if (!equipmentId) {
    console.log('EquipmentTypeFields: ❌ NO EQUIPMENT ID - NOT RENDERING');
    return null;
  }

  if (!equipmentType) {
    console.log('EquipmentTypeFields: ❌ NO EQUIPMENT TYPE - NOT RENDERING');
    return null;
  }

  console.log('EquipmentTypeFields: ✅ RENDERING EQUIPMENT FIELDS - Type:', equipmentType, 'Mobile:', isMobile);
  
  return (
    <div className={isMobile ? 'mobile-equipment-fields' : ''}>
      <EquipmentFields form={form} equipmentType={equipmentType} />
    </div>
  );
};

export default EquipmentTypeFields;
