
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
      console.log('🔧 No equipment type or selected equipment');
      return null;
    }

    try {
      // Normalize the equipment type for consistent matching
      const normalizedType = equipmentType.toLowerCase().replace(/[_\s-]/g, '');
      
      console.log('🔧 Processing equipment type:', {
        original: equipmentType,
        normalized: normalizedType
      });

      switch (normalizedType) {
        case 'coolingtower':
        case 'tower':
          return <CoolingTowerFields form={form} />;
        case 'ahu':
        case 'airhandler':
        case 'airhandlingunit':
          return <AHUMaintenanceFields form={form} />;
        case 'elevator':
          return <ElevatorMaintenanceFields form={form} />;
        case 'restroom':
          return <RestroomMaintenanceFields form={form} />;
        case 'chiller':
          // For chiller, use the general maintenance fields
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
        default:
          // General maintenance form for any unrecognized equipment type
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
    } catch (error) {
      console.error('🔧 Error rendering equipment fields:', error);
      return (
        <div className="p-4 text-center text-red-500">
          <p>Error loading maintenance form for this equipment type.</p>
          <p className="text-sm mt-2">Please try refreshing the page.</p>
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
