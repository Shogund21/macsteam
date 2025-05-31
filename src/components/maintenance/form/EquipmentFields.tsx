
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import ElevatorMaintenanceFields from "./ElevatorMaintenanceFields";
import RestroomMaintenanceFields from "./RestroomMaintenanceFields";
import CoolingTowerFields from "./CoolingTowerFields";

interface EquipmentFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
  equipmentType: string | null;
}

const EquipmentFields = ({ form, equipmentType }: EquipmentFieldsProps) => {
  console.log('🔧 EquipmentFields rendering for type:', equipmentType);

  // Always render appropriate fields - NO mobile exclusion
  if (equipmentType === 'ahu') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="ahu-fields-container"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <AHUMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'chiller') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="chiller-fields-container"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <MaintenanceReadings form={form} />
        <MaintenanceStatus form={form} />
        <MaintenanceObservations form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'cooling_tower') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="cooling-tower-fields-container"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <CoolingTowerFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'elevator') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="elevator-fields-container"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <ElevatorMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'restroom') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="restroom-fields-container"
        style={{ display: 'block', visibility: 'visible', opacity: 1 }}
      >
        <RestroomMaintenanceFields form={form} />
      </div>
    );
  }
  
  // Default or general equipment
  return (
    <div 
      className="w-full space-y-6" 
      data-component="general-fields-container"
      style={{ display: 'block', visibility: 'visible', opacity: 1 }}
    >
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </div>
  );
};

export default EquipmentFields;
