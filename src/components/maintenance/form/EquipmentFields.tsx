
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
  // Render appropriate fields based on equipment type
  if (equipmentType === 'ahu') {
    return <AHUMaintenanceFields form={form} />;
  }
  
  if (equipmentType === 'chiller') {
    return (
      <div className="space-y-6">
        <MaintenanceReadings form={form} />
        <MaintenanceStatus form={form} />
        <MaintenanceObservations form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'cooling_tower') {
    return <CoolingTowerFields form={form} />;
  }
  
  if (equipmentType === 'elevator') {
    return <ElevatorMaintenanceFields form={form} />;
  }
  
  if (equipmentType === 'restroom') {
    return <RestroomMaintenanceFields form={form} />;
  }
  
  // Default or general equipment
  return (
    <div className="space-y-6">
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </div>
  );
};

export default EquipmentFields;
