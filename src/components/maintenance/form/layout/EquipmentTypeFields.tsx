
import React, { useEffect } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import MaintenanceReadings from '../MaintenanceReadings';
import MaintenanceStatus from '../MaintenanceStatus';
import MaintenanceObservations from '../MaintenanceObservations';
import AHUMaintenanceFields from '../AHUMaintenanceFields';
import ElevatorMaintenanceFields from '../ElevatorMaintenanceFields';
import RestroomMaintenanceFields from '../RestroomMaintenanceFields';
import CoolingTowerFields from '../CoolingTowerFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  console.log('EquipmentTypeFields: 🔧 RENDERING COMPONENT:', { 
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    isMobile,
    timestamp: new Date().toISOString()
  });

  // Add effect to monitor equipment type changes
  useEffect(() => {
    console.log('EquipmentTypeFields: 🔄 EQUIPMENT TYPE CHANGED:', {
      newEquipmentType: equipmentType,
      selectedEquipment: selectedEquipment?.name,
      isMobile
    });
  }, [equipmentType, selectedEquipment, isMobile]);

  // Render debugging info in development
  if (process.env.NODE_ENV === 'development') {
    console.log('EquipmentTypeFields: 🎯 RENDER DECISION TREE:', {
      equipmentType,
      willRenderAHU: equipmentType === 'ahu',
      willRenderCoolingTower: equipmentType === 'cooling_tower',
      willRenderElevator: equipmentType === 'elevator',
      willRenderRestroom: equipmentType === 'restroom',
      willRenderDefault: !['ahu', 'cooling_tower', 'elevator', 'restroom'].includes(equipmentType || '')
    });
  }
  
  // Render appropriate fields based on equipment type
  switch (equipmentType) {
    case 'ahu':
      console.log('EquipmentTypeFields: ✅ Rendering AHU fields for mobile:', isMobile);
      return (
        <div className={isMobile ? 'mobile-ahu-fields space-y-4' : ''}>
          <AHUMaintenanceFields form={form} />
        </div>
      );
      
    case 'cooling_tower':
      console.log('EquipmentTypeFields: ✅ Rendering cooling tower fields for mobile:', isMobile);
      return (
        <div className={isMobile ? 'mobile-cooling-tower-fields space-y-4' : ''}>
          <CoolingTowerFields form={form} />
        </div>
      );
      
    case 'elevator':
      console.log('EquipmentTypeFields: ✅ Rendering elevator fields for mobile:', isMobile);
      return (
        <div className={isMobile ? 'mobile-elevator-fields space-y-4' : ''}>
          <ElevatorMaintenanceFields form={form} />
        </div>
      );
      
    case 'restroom':
      console.log('EquipmentTypeFields: ✅ Rendering restroom fields for mobile:', isMobile);
      return (
        <div className={isMobile ? 'mobile-restroom-fields space-y-4' : ''}>
          <RestroomMaintenanceFields form={form} />
        </div>
      );
      
    default:
      console.log('EquipmentTypeFields: ℹ️ Rendering default/general fields for mobile:', isMobile, 'equipmentType:', equipmentType);
      return (
        <div className={isMobile ? 'mobile-general-fields space-y-4' : 'space-y-6'}>
          <MaintenanceReadings form={form} />
          <MaintenanceStatus form={form} />
          <MaintenanceObservations form={form} />
        </div>
      );
  }
};

export default EquipmentTypeFields;
