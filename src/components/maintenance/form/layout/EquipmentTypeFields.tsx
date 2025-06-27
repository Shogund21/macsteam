
import React, { memo, useCallback } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import CoolingTowerFields from '../CoolingTowerFields';
import AHUMaintenanceFields from '../AHUMaintenanceFields';
import ElevatorMaintenanceFields from '../ElevatorMaintenanceFields';
import RestroomMaintenanceFields from '../RestroomMaintenanceFields';

const EquipmentTypeFields = memo(() => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  console.log('🔧 EquipmentTypeFields render:', { 
    equipmentType, 
    selectedEquipmentId: selectedEquipment?.id,
    isMobile 
  });

  const renderEquipmentFields = useCallback(() => {
    if (!equipmentType || !selectedEquipment) {
      console.log('🔧 No equipment type or selected equipment');
      return null;
    }

    try {
      switch (equipmentType.toLowerCase()) {
        case 'cooling tower':
        case 'coolingtower':
          return <CoolingTowerFields form={form} />;
        case 'ahu':
        case 'air handler':
        case 'air handling unit':
          return <AHUMaintenanceFields form={form} />;
        case 'elevator':
          return <ElevatorMaintenanceFields form={form} />;
        case 'restroom':
          return <RestroomMaintenanceFields form={form} />;
        default:
          console.log('🔧 Unknown equipment type:', equipmentType);
          return (
            <div className="p-4 text-center text-gray-500">
              <p>Equipment type "{equipmentType}" maintenance form is not yet available.</p>
              <p className="text-sm mt-2">Please contact support to add this equipment type.</p>
            </div>
          );
      }
    } catch (error) {
      console.error('🔧 Error rendering equipment fields:', error);
      return (
        <div className="p-4 text-center text-red-500">
          <p>Error loading maintenance form for this equipment type.</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
        </div>
      );
    }
  }, [equipmentType, selectedEquipment, form]);

  return (
    <div 
      className="w-full"
      data-component="equipment-type-fields"
      data-equipment-type={equipmentType}
    >
      {renderEquipmentFields()}
    </div>
  );
});

EquipmentTypeFields.displayName = 'EquipmentTypeFields';

export default EquipmentTypeFields;
