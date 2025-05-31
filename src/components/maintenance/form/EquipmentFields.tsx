
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
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
  equipmentType: string | null;
}

const EquipmentFields = ({ form, equipmentType }: EquipmentFieldsProps) => {
  const isMobile = useIsMobile();
  
  console.log('EquipmentFields: 🔧 RENDERING with type:', equipmentType, 'isMobile:', isMobile);
  
  // Render appropriate fields based on equipment type
  if (equipmentType === 'ahu') {
    console.log('EquipmentFields: ✅ RENDERING AHU FIELDS');
    return (
      <div className={isMobile ? 'mobile-ahu-fields space-y-4' : 'space-y-6'}>
        <AHUMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'chiller') {
    console.log('EquipmentFields: ✅ RENDERING CHILLER FIELDS (General)');
    return (
      <div className={isMobile ? 'mobile-general-fields space-y-4' : 'space-y-6'}>
        <MaintenanceReadings form={form} />
        <MaintenanceStatus form={form} />
        <MaintenanceObservations form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'cooling_tower') {
    console.log('EquipmentFields: ✅ RENDERING COOLING TOWER FIELDS');
    return (
      <div className={isMobile ? 'mobile-cooling-tower-fields space-y-4' : 'space-y-6'}>
        <CoolingTowerFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'elevator') {
    console.log('EquipmentFields: ✅ RENDERING ELEVATOR FIELDS');
    return (
      <div className={isMobile ? 'mobile-elevator-fields space-y-4' : 'space-y-6'}>
        <ElevatorMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'restroom') {
    console.log('EquipmentFields: ✅ RENDERING RESTROOM FIELDS');
    return (
      <div className={isMobile ? 'mobile-restroom-fields space-y-4' : 'space-y-6'}>
        <RestroomMaintenanceFields form={form} />
      </div>
    );
  }
  
  // Default or general equipment
  console.log('EquipmentFields: ℹ️ RENDERING DEFAULT/GENERAL FIELDS');
  return (
    <div className={isMobile ? 'mobile-general-fields space-y-4' : 'space-y-6'}>
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </div>
  );
};

export default EquipmentFields;
