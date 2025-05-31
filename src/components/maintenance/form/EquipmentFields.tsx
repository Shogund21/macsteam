
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
  
  console.log('EquipmentFields: 🔧 MOBILE RENDERING DEBUG:', {
    equipmentType, 
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    timestamp: new Date().toISOString()
  });
  
  // Mobile debugging component wrapper
  const MobileDebugWrapper = ({ children, type }: { children: React.ReactNode, type: string }) => (
    <div className={isMobile ? `mobile-${type}-fields space-y-4` : 'space-y-6'}>
      {isMobile && (
        <div style={{ 
          backgroundColor: '#f3e5f5', 
          padding: '6px 12px', 
          borderRadius: '4px',
          fontSize: '11px',
          color: '#7b1fa2',
          marginBottom: '8px'
        }}>
          📱 Rendering {type} maintenance fields
        </div>
      )}
      {children}
    </div>
  );
  
  // Render appropriate fields based on equipment type
  if (equipmentType === 'ahu') {
    console.log('EquipmentFields: ✅ MOBILE - RENDERING AHU FIELDS');
    return (
      <MobileDebugWrapper type="ahu">
        <AHUMaintenanceFields form={form} />
      </MobileDebugWrapper>
    );
  }
  
  if (equipmentType === 'chiller') {
    console.log('EquipmentFields: ✅ MOBILE - RENDERING CHILLER FIELDS');
    return (
      <MobileDebugWrapper type="chiller">
        <MaintenanceReadings form={form} />
        <MaintenanceStatus form={form} />
        <MaintenanceObservations form={form} />
      </MobileDebugWrapper>
    );
  }
  
  if (equipmentType === 'cooling_tower') {
    console.log('EquipmentFields: ✅ MOBILE - RENDERING COOLING TOWER FIELDS');
    return (
      <MobileDebugWrapper type="cooling-tower">
        <CoolingTowerFields form={form} />
      </MobileDebugWrapper>
    );
  }
  
  if (equipmentType === 'elevator') {
    console.log('EquipmentFields: ✅ MOBILE - RENDERING ELEVATOR FIELDS');
    return (
      <MobileDebugWrapper type="elevator">
        <ElevatorMaintenanceFields form={form} />
      </MobileDebugWrapper>
    );
  }
  
  if (equipmentType === 'restroom') {
    console.log('EquipmentFields: ✅ MOBILE - RENDERING RESTROOM FIELDS');
    return (
      <MobileDebugWrapper type="restroom">
        <RestroomMaintenanceFields form={form} />
      </MobileDebugWrapper>
    );
  }
  
  // Default or general equipment
  console.log('EquipmentFields: ℹ️ MOBILE - RENDERING DEFAULT/GENERAL FIELDS');
  return (
    <MobileDebugWrapper type="general">
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </MobileDebugWrapper>
  );
};

export default EquipmentFields;
