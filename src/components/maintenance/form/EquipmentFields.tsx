
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
  
  console.log('🔧 EquipmentFields rendering for type:', equipmentType, 'Mobile:', isMobile);

  // Render equipment-specific fields based on type
  const renderEquipmentFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return (
          <div className={`w-full ${isMobile ? 'mobile-container' : ''}`}>
            <AHUMaintenanceFields form={form} />
          </div>
        );
      
      case 'chiller':
        return (
          <div className={`w-full space-y-4 ${isMobile ? 'mobile-container' : ''}`}>
            {isMobile && (
              <div className="checklist-section-header">
                ❄️ Chiller Maintenance Checklist
              </div>
            )}
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
      
      case 'cooling_tower':
        return (
          <div className={`w-full space-y-4 ${isMobile ? 'mobile-container' : ''}`}>
            {isMobile && (
              <div className="checklist-section-header">
                🌊 Cooling Tower Maintenance Checklist
              </div>
            )}
            <CoolingTowerFields form={form} />
          </div>
        );
      
      case 'elevator':
        return (
          <div className={`w-full space-y-4 ${isMobile ? 'mobile-container' : ''}`}>
            {isMobile && (
              <div className="checklist-section-header">
                🛗 Elevator Maintenance Checklist
              </div>
            )}
            <ElevatorMaintenanceFields form={form} />
          </div>
        );
      
      case 'restroom':
        return (
          <div className={`w-full space-y-4 ${isMobile ? 'mobile-container' : ''}`}>
            {isMobile && (
              <div className="checklist-section-header">
                🚿 Restroom Maintenance Checklist
              </div>
            )}
            <RestroomMaintenanceFields form={form} />
          </div>
        );
      
      default:
        return (
          <div className={`w-full space-y-4 ${isMobile ? 'mobile-container' : ''}`}>
            {isMobile && (
              <div className="checklist-section-header">
                🔧 General Maintenance Checklist
              </div>
            )}
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${isMobile ? 'mobile-scroll-container' : ''}`}>
      {renderEquipmentFields()}
    </div>
  );
};

export default EquipmentFields;
