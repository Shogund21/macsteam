
import React, { memo, useCallback } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import CoolingTowerFields from '../CoolingTowerFields';
import AHUMaintenanceFields from '../AHUMaintenanceFields';
import ElevatorMaintenanceFields from '../ElevatorMaintenanceFields';
import RestroomMaintenanceFields from '../RestroomMaintenanceFields';
import MaintenanceReadings from '../MaintenanceReadings';
import MaintenanceStatus from '../MaintenanceStatus';
import MaintenanceObservations from '../MaintenanceObservations';

const EquipmentTypeFields = memo(() => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  console.log('🔧 EquipmentTypeFields render:', { 
    equipmentType, 
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    isMobile 
  });

  const renderEquipmentFields = useCallback(() => {
    if (!equipmentType || !selectedEquipment) {
      console.log('🔧 EquipmentTypeFields: Missing data:', {
        hasEquipmentType: !!equipmentType,
        hasSelectedEquipment: !!selectedEquipment,
        equipmentType,
        equipmentName: selectedEquipment?.name
      });
      return (
        <div className="p-4 text-center text-gray-500">
          <p>Please select equipment to see maintenance checklist</p>
        </div>
      );
    }

    console.log('🔧 EquipmentTypeFields: Processing equipment type:', {
      equipmentType,
      equipmentName: selectedEquipment.name
    });

    // SIMPLIFIED: Direct switch without normalization to avoid mismatches
    switch (equipmentType) {
      case 'coolingtower':
        console.log('🔧 EquipmentTypeFields: Rendering CoolingTowerFields');
        return <CoolingTowerFields form={form} />;
        
      case 'ahu':
        console.log('🔧 EquipmentTypeFields: Rendering AHUMaintenanceFields');
        return <AHUMaintenanceFields form={form} />;
        
      case 'elevator':
        console.log('🔧 EquipmentTypeFields: Rendering ElevatorMaintenanceFields');
        return <ElevatorMaintenanceFields form={form} />;
        
      case 'restroom':
        console.log('🔧 EquipmentTypeFields: Rendering RestroomMaintenanceFields');
        return <RestroomMaintenanceFields form={form} />;
        
      case 'chiller':
        console.log('🔧 EquipmentTypeFields: Rendering Chiller maintenance fields');
        return (
          <div className="w-full space-y-4">
            <div className={`bg-blue-50 p-4 rounded-lg border border-blue-200 ${isMobile ? 'mb-4' : 'mb-6'}`}>
              <div className="flex items-center space-x-2">
                <div className="text-blue-600 text-2xl">❄️</div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Chiller Maintenance Checklist</h3>
                  <p className="text-sm text-blue-600">Complete all inspection items below</p>
                </div>
              </div>
            </div>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
        
      case 'general':
      default:
        console.log('🔧 EquipmentTypeFields: Rendering General maintenance fields');
        return (
          <div className="w-full space-y-4">
            <div className={`bg-gray-50 p-4 rounded-lg border border-gray-200 ${isMobile ? 'mb-4' : 'mb-6'}`}>
              <div className="flex items-center space-x-2">
                <div className="text-gray-600 text-2xl">🔧</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">General Maintenance Checklist</h3>
                  <p className="text-sm text-gray-600">Equipment: {selectedEquipment.name}</p>
                </div>
              </div>
            </div>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
    }
  }, [equipmentType, selectedEquipment, form, isMobile]);

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
