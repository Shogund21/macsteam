
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
      style={{ 
        display: 'block !important',
        visibility: 'visible !important',
        opacity: '1 !important',
        width: '100%',
        minHeight: isMobile ? '300px' : 'auto',
        backgroundColor: isMobile ? '#fef3c7' : 'transparent',
        border: isMobile ? '2px dashed #f59e0b' : 'none',
        padding: isMobile ? '12px' : '0',
        borderRadius: isMobile ? '6px' : '0',
        position: 'relative',
        zIndex: isMobile ? '100' : '1'
      }}
    >
      {isMobile && (
        <div 
          className="mb-3 p-2 bg-yellow-200 border border-yellow-400 rounded text-xs font-bold"
          style={{ 
            display: 'block !important',
            visibility: 'visible !important'
          }}
        >
          📋 CHECKLIST CONTAINER - Type: {equipmentType || 'Unknown'}
        </div>
      )}
      <EquipmentFields 
        form={form} 
        equipmentType={equipmentType}
      />
    </div>
  );
};

export default EquipmentTypeFields;
