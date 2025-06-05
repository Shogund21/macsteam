
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
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ AHU/RTU Maintenance Checklist
              </div>
            )}
            <AHUMaintenanceFields form={form} />
          </div>
        );
      
      case 'chiller':
        return (
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ Chiller Maintenance Checklist
              </div>
            )}
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
      
      case 'cooling_tower':
        return (
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ Cooling Tower Maintenance Checklist
              </div>
            )}
            <CoolingTowerFields form={form} />
          </div>
        );
      
      case 'elevator':
        return (
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ Elevator Maintenance Checklist
              </div>
            )}
            <ElevatorMaintenanceFields form={form} />
          </div>
        );
      
      case 'restroom':
        return (
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ Restroom Maintenance Checklist
              </div>
            )}
            <RestroomMaintenanceFields form={form} />
          </div>
        );
      
      default:
        return (
          <div className="w-full space-y-4 mobile-checklist-force-visible" data-force-visible="true">
            {isMobile && (
              <div className="text-green-600 font-medium p-2 bg-green-50 rounded">
                ✓ General Maintenance Checklist
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
    <div 
      className="w-full mobile-checklist-force-visible" 
      data-component="equipment-fields-container"
      data-force-visible="true"
      style={isMobile ? { 
        display: 'block !important', 
        visibility: 'visible !important', 
        opacity: '1 !important',
        minHeight: '100px'
      } : {}}
    >
      {renderEquipmentFields()}
    </div>
  );
};

export default EquipmentFields;
