
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
  
  const [forceVisible, setForceVisible] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  
  // Get form equipment ID directly
  const formEquipmentId = form.watch('equipment_id');
  
  console.log('🔧 MobileMaintenanceChecklist AGGRESSIVE DEBUG:', {
    hasSelectedEquipment: !!selectedEquipment,
    selectedEquipmentName: selectedEquipment?.name || 'None',
    formEquipmentId: formEquipmentId || 'None',
    forceVisible,
    renderKey,
    timestamp: new Date().toISOString()
  });

  // AGGRESSIVE: Show checklist if EITHER selectedEquipment OR formEquipmentId exists
  useEffect(() => {
    const shouldShow = !!(selectedEquipment || formEquipmentId);
    console.log('🔧 AGGRESSIVE VISIBILITY CHECK:', {
      selectedEquipment: !!selectedEquipment,
      formEquipmentId: !!formEquipmentId,
      shouldShow,
      currentForceVisible: forceVisible
    });
    
    if (shouldShow && !forceVisible) {
      setForceVisible(true);
      setRenderKey(prev => prev + 1);
      console.log('🔧 FORCING CHECKLIST VISIBLE - Equipment detected!');
    } else if (!shouldShow && forceVisible) {
      setForceVisible(false);
      console.log('🔧 HIDING CHECKLIST - No equipment detected');
    }
  }, [selectedEquipment, formEquipmentId, forceVisible]);

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

  // AGGRESSIVE: Determine equipment to use (priority: selectedEquipment, then try to derive from form)
  const equipmentToUse = selectedEquipment || (formEquipmentId ? { 
    id: formEquipmentId, 
    name: `Equipment ${formEquipmentId.slice(0, 8)}`,
    location: '',
    model: '',
    serialNumber: '',
    lastMaintenance: null,
    nextMaintenance: null,
    status: ''
  } as Equipment : null);

  // AGGRESSIVE: Always show something if we have any equipment data
  const shouldShowChecklist = forceVisible || !!equipmentToUse || !!formEquipmentId;

  console.log('🔧 FINAL RENDER DECISION:', {
    shouldShowChecklist,
    equipmentToUse: equipmentToUse?.name || 'None',
    renderKey
  });

  if (!shouldShowChecklist) {
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

  if (!equipmentToUse) {
    console.log('🔧 EMERGENCY FALLBACK: No equipment but should show checklist');
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-700 text-center font-medium">⚠️ EMERGENCY MODE: Checklist should display but no equipment found</p>
        <div className="mt-2 text-xs text-red-600">
          Form Equipment ID: {formEquipmentId || 'None'}<br/>
          Selected Equipment: {selectedEquipment?.name || 'None'}<br/>
          Force Visible: {forceVisible ? 'YES' : 'NO'}
        </div>
      </div>
    );
  }

  const equipmentType = detectEquipmentType(equipmentToUse.name);

  // Render equipment-specific checklist with AGGRESSIVE visibility
  const renderChecklistFields = () => {
    switch (equipmentType) {
      case 'ahu':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✅ AHU/RTU Maintenance Checklist - {equipmentToUse.name}
            </div>
            <AHUMaintenanceFields form={form} />
          </div>
        );
      
      case 'chiller':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✅ Chiller Maintenance Checklist - {equipmentToUse.name}
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
              ✅ Cooling Tower Maintenance Checklist - {equipmentToUse.name}
            </div>
            <CoolingTowerFields form={form} />
          </div>
        );
      
      case 'elevator':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✅ Elevator Maintenance Checklist - {equipmentToUse.name}
            </div>
            <ElevatorMaintenanceFields form={form} />
          </div>
        );
      
      case 'restroom':
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✅ Restroom Maintenance Checklist - {equipmentToUse.name}
            </div>
            <RestroomMaintenanceFields form={form} />
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg border border-green-200">
              ✅ General Maintenance Checklist - {equipmentToUse.name}
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
      key={`aggressive-checklist-${renderKey}-${equipmentToUse.id}`}
      className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-in fade-in duration-300"
      data-component="mobile-maintenance-checklist-aggressive"
      data-equipment-type={equipmentType}
      data-equipment-name={equipmentToUse.name}
      data-force-visible={forceVisible}
      data-render-key={renderKey}
    >
      {/* AGGRESSIVE status indicator */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-700 font-medium">
          🚀 AGGRESSIVE CHECKLIST MODE: ACTIVE<br />
          Equipment: {equipmentToUse.name}<br />
          Type: {equipmentType.toUpperCase()}<br />
          Render Key: {renderKey}<br />
          Status: ✅ CHECKLIST FORCED VISIBLE
        </div>
      </div>
      
      {renderChecklistFields()}
    </div>
  );
};

export default MobileMaintenanceChecklist;
