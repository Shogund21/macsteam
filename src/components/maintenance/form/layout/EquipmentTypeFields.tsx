
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
  
  const equipmentId = form.watch('equipment_id');
  
  console.log('EquipmentTypeFields: 🔧 COMPREHENSIVE DEBUG:', { 
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    formEquipmentId: equipmentId,
    isMobile,
    hasEquipmentId: !!equipmentId,
    equipmentTypeIsAhu: equipmentType === 'ahu',
    timestamp: new Date().toISOString()
  });

  // Mobile-specific debugging
  if (isMobile) {
    console.log('EquipmentTypeFields: 📱 MOBILE SPECIFIC DEBUG:', {
      screenWidth: window.innerWidth,
      equipmentType,
      selectedEquipment: selectedEquipment ? {
        id: selectedEquipment.id,
        name: selectedEquipment.name
      } : null,
      formState: {
        equipment_id: form.getValues('equipment_id'),
        location_id: form.getValues('location_id')
      }
    });
  }

  // Add effect to monitor equipment type changes
  useEffect(() => {
    console.log('EquipmentTypeFields: 🔄 EQUIPMENT TYPE EFFECT TRIGGERED:', {
      newEquipmentType: equipmentType,
      selectedEquipment: selectedEquipment?.name,
      isMobile,
      shouldRenderAHU: equipmentType === 'ahu'
    });
    
    // Force a small delay to ensure mobile rendering
    if (isMobile && equipmentType) {
      setTimeout(() => {
        console.log('EquipmentTypeFields: 📱 MOBILE DELAYED CHECK:', {
          equipmentType,
          stillSelected: selectedEquipment?.name
        });
      }, 100);
    }
  }, [equipmentType, selectedEquipment, isMobile]);

  // Early return if no equipment selected
  if (!equipmentId) {
    console.log('EquipmentTypeFields: ❌ NO EQUIPMENT ID - NOT RENDERING');
    return null;
  }

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
  
  // Render appropriate fields based on equipment type with explicit checks
  if (equipmentType === 'ahu') {
    console.log('EquipmentTypeFields: ✅ RENDERING AHU FIELDS - Mobile:', isMobile);
    return (
      <div className={isMobile ? 'mobile-ahu-fields space-y-4' : 'space-y-6'}>
        <AHUMaintenanceFields form={form} />
      </div>
    );
  }
      
  if (equipmentType === 'cooling_tower') {
    console.log('EquipmentTypeFields: ✅ RENDERING COOLING TOWER FIELDS - Mobile:', isMobile);
    return (
      <div className={isMobile ? 'mobile-cooling-tower-fields space-y-4' : 'space-y-6'}>
        <CoolingTowerFields form={form} />
      </div>
    );
  }
      
  if (equipmentType === 'elevator') {
    console.log('EquipmentTypeFields: ✅ RENDERING ELEVATOR FIELDS - Mobile:', isMobile);
    return (
      <div className={isMobile ? 'mobile-elevator-fields space-y-4' : 'space-y-6'}>
        <ElevatorMaintenanceFields form={form} />
      </div>
    );
  }
      
  if (equipmentType === 'restroom') {
    console.log('EquipmentTypeFields: ✅ RENDERING RESTROOM FIELDS - Mobile:', isMobile);
    return (
      <div className={isMobile ? 'mobile-restroom-fields space-y-4' : 'space-y-6'}>
        <RestroomMaintenanceFields form={form} />
      </div>
    );
  }
      
  // Default case - general equipment
  console.log('EquipmentTypeFields: ℹ️ RENDERING DEFAULT/GENERAL FIELDS - Mobile:', isMobile, 'equipmentType:', equipmentType);
  return (
    <div className={isMobile ? 'mobile-general-fields space-y-4' : 'space-y-6'}>
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </div>
  );
};

export default EquipmentTypeFields;
