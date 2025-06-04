
import React, { useEffect, useState } from 'react';
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
  
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(null);

  // Watch for equipment changes and update visibility
  useEffect(() => {
    console.log('🔧 MobileMaintenanceChecklist - Equipment change detected:', {
      hasEquipment: !!selectedEquipment,
      equipmentName: selectedEquipment?.name || 'None',
      previousEquipment: currentEquipment?.name || 'None',
      timestamp: new Date().toISOString()
    });

    if (selectedEquipment) {
      setCurrentEquipment(selectedEquipment);
      setIsChecklistVisible(true);
      console.log('🔧 MobileMaintenanceChecklist - Checklist made visible for:', selectedEquipment.name);
    } else {
      setIsChecklistVisible(false);
      console.log('🔧 MobileMaintenanceChecklist - Checklist hidden - no equipment selected');
    }
  }, [selectedEquipment, currentEquipment]);

  // Also watch form equipment_id to catch any missed updates
  const formEquipmentId = form.watch('equipment_id');
  useEffect(() => {
    if (formEquipmentId && !selectedEquipment) {
      console.log('🔧 MobileMaintenanceChecklist - Form has equipment but selectedEquipment is null, forcing visibility');
      setIsChecklistVisible(true);
    }
  }, [formEquipmentId, selectedEquipment]);

  console.log('🔧 MobileMaintenanceChecklist render:', {
    hasEquipment: !!selectedEquipment,
    equipmentName: selectedEquipment?.name || 'None',
    isChecklistVisible,
    formEquipmentId,
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

  // If no equipment is selected and checklist is not visible, show waiting state
  if (!selectedEquipment && !isChecklistVisible) {
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

  // Use either selectedEquipment or currentEquipment for rendering
  const equipmentToUse = selectedEquipment || currentEquipment;
  
  if (!equipmentToUse) {
    return (
      <div className="w-full p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-700 text-center">Loading equipment details...</p>
      </div>
    );
  }

  const equipmentType = detectEquipmentType(equipmentToUse.name);

  console.log('🔧 MobileMaintenanceChecklist showing checklist:', {
    equipmentName: equipmentToUse.name,
    detectedType: equipmentType,
    isVisible: isChecklistVisible
  });

  // Render equipment-specific checklist with enhanced visibility
  const renderChecklistFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ AHU/RTU Maintenance Checklist - {equipmentToUse.name}
            </div>
            <AHUMaintenanceFields form={form} />
          </div>
        );
      
      case 'chiller':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ Chiller Maintenance Checklist - {equipmentToUse.name}
            </div>
            <MaintenanceReadings form={form} />
            <MaintenanceStatus form={form} />
            <MaintenanceObservations form={form} />
          </div>
        );
      
      case 'cooling_tower':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ Cooling Tower Maintenance Checklist - {equipmentToUse.name}
            </div>
            <CoolingTowerFields form={form} />
          </div>
        );
      
      case 'elevator':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ Elevator Maintenance Checklist - {equipmentToUse.name}
            </div>
            <ElevatorMaintenanceFields form={form} />
          </div>
        );
      
      case 'restroom':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ Restroom Maintenance Checklist - {equipmentToUse.name}
            </div>
            <RestroomMaintenanceFields form={form} />
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✓ General Maintenance Checklist - {equipmentToUse.name}
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
      className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-in fade-in duration-300"
      data-component="mobile-maintenance-checklist"
      data-equipment-type={equipmentType}
      data-equipment-name={equipmentToUse.name}
      data-checklist-visible={isChecklistVisible}
    >
      {/* Dynamic status indicator */}
      <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-700">
          <strong>📋 Checklist Status:</strong> {isChecklistVisible ? 'ACTIVE' : 'WAITING'} | 
          Equipment: {equipmentToUse.name} | 
          Type: {equipmentType.toUpperCase()}
        </div>
      </div>
      
      {renderChecklistFields()}
    </div>
  );
};

export default MobileMaintenanceChecklist;
