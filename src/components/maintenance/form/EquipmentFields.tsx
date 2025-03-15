
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import ElevatorMaintenanceFields from "./ElevatorMaintenanceFields";
import RestroomMaintenanceFields from "./RestroomMaintenanceFields";

interface EquipmentFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
  equipmentType: string | null;
}

const EquipmentFields = ({ form, equipmentType }: EquipmentFieldsProps) => {
  if (equipmentType === 'ahu') {
    return <AHUMaintenanceFields form={form} />;
  }
  
  if (equipmentType === 'elevator') {
    return <ElevatorMaintenanceFields form={form} />;
  }
  
  if (equipmentType === 'restroom') {
    return <RestroomMaintenanceFields form={form} />;
  }
  
  // Default or general equipment
  return (
    <>
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </>
  );
};

export default EquipmentFields;
