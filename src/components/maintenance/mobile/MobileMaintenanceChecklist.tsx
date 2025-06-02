
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Equipment } from '@/types/maintenance';
import AHUMaintenanceFields from '../form/AHUMaintenanceFields';
import ElevatorMaintenanceFields from '../form/ElevatorMaintenanceFields';
import RestroomMaintenanceFields from '../form/RestroomMaintenanceFields';
import CoolingTowerFields from '../form/CoolingTowerFields';
import MaintenanceReadings from '../form/MaintenanceReadings';
import MaintenanceStatus from '../form/MaintenanceStatus';
import MaintenanceObservations from '../form/MaintenanceObservations';

interface MobileMaintenanceChecklistProps {
  form: UseFormReturn<any>;
  selectedEquipment: Equipment | null;
}

const MobileMaintenanceChecklist = ({ 
  form, 
  selectedEquipment 
}: MobileMaintenanceChecklistProps) => {
  
  console.log('🔧 MobileMaintenanceChecklist render:', {
    hasEquipment: !!selectedEquipment,
    equipmentName: selectedEquipment?.name || 'None',
    timestamp: new Date().toISOString()
  });

  // Detect equipment type from name
  const detectEquipmentType = (equipmentName: string): string => {
    const name = equipmentName.toLowerCase();
    
    if (name.includes('ahu') || name.includes('air handler') || name.includes('rtu') || name.includes('rooftop')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower') || name.includes('tower')) return 'cooling_tower';
    if (name.includes('elevator') || name.includes('lift')) return 'elevator';
    if (name.includes('restroom') || name.includes('bathroom')) return 'restroom';
    
    return 'general';
  };

  if (!selectedEquipment) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center py-8 text-gray-500">
          <div className="mb-3">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Select Equipment Above</p>
          <p className="text-sm">Choose equipment to display the maintenance checklist</p>
        </div>
      </div>
    );
  }

  const equipmentType = detectEquipmentType(selectedEquipment.name);

  console.log('🔧 MobileMaintenanceChecklist showing checklist:', {
    equipmentName: selectedEquipment.name,
    detectedType: equipmentType
  });

  // Render equipment-specific checklist
  const renderChecklistFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ AHU/RTU Maintenance Checklist - {selectedEquipment.name}
            </div>
            <AHUMaintenanceFields form={form} />
          </div>
        );
      
      case 'chiller':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ Chiller Maintenance Checklist - {selectedEquipment.name}
            </div>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
      
      case 'cooling_tower':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ Cooling Tower Maintenance Checklist - {selectedEquipment.name}
            </div>
            <CoolingTowerFields form={form} />
          </div>
        );
      
      case 'elevator':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ Elevator Maintenance Checklist - {selectedEquipment.name}
            </div>
            <ElevatorMaintenanceFields form={form} />
          </div>
        );
      
      case 'restroom':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ Restroom Maintenance Checklist - {selectedEquipment.name}
            </div>
            <RestroomMaintenanceFields form={form} />
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
              ✓ General Maintenance Checklist - {selectedEquipment.name}
            </div>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
    }
  };

  return (
    <div 
      className="w-full bg-white p-4 rounded-lg shadow-sm"
      data-component="mobile-maintenance-checklist"
      data-equipment-type={equipmentType}
      data-equipment-name={selectedEquipment.name}
    >
      {renderChecklistFields()}
    </div>
  );
};

export default MobileMaintenanceChecklist;
