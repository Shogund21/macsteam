
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();

  console.log('🔧 EquipmentTypeFields rendering:', { 
    equipmentType, 
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    equipmentId: form.watch('equipment_id')
  });

  // CRITICAL: Enhanced mobile debugging and force visibility
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE EQUIPMENT TYPE FIELDS DEBUG:', {
        equipmentType,
        selectedEquipmentName: selectedEquipment?.name,
        selectedEquipmentId: selectedEquipment?.id,
        formEquipmentId: form.watch('equipment_id'),
        isMobile,
        timestamp: new Date().toISOString()
      });
    }
  }, [equipmentType, selectedEquipment, isMobile, form]);

  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
      data-equipment-type={equipmentType}
      data-mobile-debug={isMobile ? 'true' : 'false'}
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '50px'
      }}
    >
      {/* Mobile debugging info */}
      {isMobile && (
        <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
          <strong>Equipment Type Debug:</strong> {equipmentType || 'Not detected'}<br />
          <strong>Equipment:</strong> {selectedEquipment?.name || 'None selected'}
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
