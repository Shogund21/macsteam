
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
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface EquipmentFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
  equipmentType: string | null;
}

const EquipmentFields = ({ form, equipmentType }: EquipmentFieldsProps) => {
  // Use context-provided isMobile for consistency
  const { isMobile } = useMaintenanceFormContext();
  
  console.log('EquipmentFields: 🔧 MOBILE RENDERING DEBUG:', {
    equipmentType, 
    isMobile,
    contextProvidedMobile: isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    timestamp: new Date().toISOString()
  });
  
  // Mobile debugging component wrapper with enhanced visibility
  const MobileDebugWrapper = ({ children, type }: { children: React.ReactNode, type: string }) => (
    <div 
      className={`equipment-fields-container ${isMobile ? `mobile-${type}-fields` : ''} space-y-4`}
      style={{ 
        width: '100%', 
        display: 'block', 
        visibility: 'visible', 
        opacity: 1,
        minHeight: '200px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}
    >
      {isMobile && (
        <div style={{ 
          backgroundColor: '#f3e5f5', 
          padding: '12px', 
          borderRadius: '6px',
          fontSize: '13px',
          color: '#7b1fa2',
          marginBottom: '16px',
          border: '2px solid #9c27b0',
          fontWeight: 'bold'
        }}>
          📱 Mobile: Rendering {type} maintenance fields (Width: {typeof window !== 'undefined' ? window.innerWidth : 'unknown'}px)
        </div>
      )}
      <div 
        className={isMobile ? 'mobile-equipment-content' : ''}
        style={{ 
          width: '100%', 
          display: 'block', 
          visibility: 'visible', 
          opacity: 1 
        }}
      >
        {children}
      </div>
    </div>
  );
  
  // Render appropriate fields based on equipment type with forced visibility
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
