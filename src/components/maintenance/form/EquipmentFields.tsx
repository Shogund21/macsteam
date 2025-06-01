
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
  
  console.log('🔧 EquipmentFields rendering for type:', equipmentType);

  // CRITICAL: Enhanced mobile debugging
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE EQUIPMENT FIELDS RENDER:', {
        equipmentType,
        isMobile,
        timestamp: new Date().toISOString()
      });
    }
  }, [equipmentType, isMobile]);

  // Always render appropriate fields for all devices
  if (equipmentType === 'ahu') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="ahu-fields-container"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        {isMobile && (
          <div className="text-green-600 font-medium">✓ AHU Maintenance Fields Loaded</div>
        )}
        <AHUMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'chiller') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="chiller-fields-container"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        {isMobile && (
          <div className="text-green-600 font-medium">✓ Chiller Maintenance Fields Loaded</div>
        )}
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
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        {isMobile && (
          <div className="text-green-600 font-medium">✓ Cooling Tower Fields Loaded</div>
        )}
        <CoolingTowerFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'elevator') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="elevator-fields-container"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        {isMobile && (
          <div className="text-green-600 font-medium">✓ Elevator Maintenance Fields Loaded</div>
        )}
        <ElevatorMaintenanceFields form={form} />
      </div>
    );
  }
  
  if (equipmentType === 'restroom') {
    return (
      <div 
        className="w-full space-y-6" 
        data-component="restroom-fields-container"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        {isMobile && (
          <div className="text-green-600 font-medium">✓ Restroom Maintenance Fields Loaded</div>
        )}
        <RestroomMaintenanceFields form={form} />
      </div>
    );
  }
  
  // Default or general equipment
  return (
    <div 
      className="w-full space-y-6" 
      data-component="general-fields-container"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      {isMobile && (
        <div className="text-green-600 font-medium">✓ General Maintenance Fields Loaded</div>
      )}
      <MaintenanceReadings form={form} />
      <MaintenanceStatus form={form} />
      <MaintenanceObservations form={form} />
    </div>
  );
};

export default EquipmentFields;
