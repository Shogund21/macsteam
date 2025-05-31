
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import MaintenanceReadings from '../MaintenanceReadings';
import MaintenanceStatus from '../MaintenanceStatus';
import MaintenanceObservations from '../MaintenanceObservations';
import AHUMaintenanceFields from '../AHUMaintenanceFields';
import ElevatorMaintenanceFields from '../ElevatorMaintenanceFields';
import RestroomMaintenanceFields from '../RestroomMaintenanceFields';
import CoolingTowerFields from '../CoolingTowerFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment } = useMaintenanceFormContext();
  
  console.log('EquipmentTypeFields rendering:', { 
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name 
  });
  
  // Render appropriate fields based on equipment type
  switch (equipmentType) {
    case 'ahu':
      console.log('Rendering AHU fields');
      return <AHUMaintenanceFields form={form} />;
    case 'cooling_tower':
      console.log('Rendering cooling tower fields');
      return <CoolingTowerFields form={form} />;
    case 'elevator':
      console.log('Rendering elevator fields');
      return <ElevatorMaintenanceFields form={form} />;
    case 'restroom':
      console.log('Rendering restroom fields');
      return <RestroomMaintenanceFields form={form} />;
    default:
      console.log('Rendering default/general fields');
      return (
        <div className="space-y-6">
          <MaintenanceReadings form={form} />
          <MaintenanceStatus form={form} />
          <MaintenanceObservations form={form} />
        </div>
      );
  }
};

export default EquipmentTypeFields;
