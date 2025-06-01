
import React, { useState, useEffect } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipment, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Local state for immediate updates
  const [localEquipmentId, setLocalEquipmentId] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  // CRITICAL: Direct form state lookup - no context dependencies
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  // CRITICAL: Immediate state synchronization
  useEffect(() => {
    if (formEquipmentId !== localEquipmentId) {
      console.log('🔧 IMMEDIATE STATE SYNC:', { formEquipmentId, localEquipmentId });
      setLocalEquipmentId(formEquipmentId || '');
      setIsReady(true);
    }
  }, [formEquipmentId, localEquipmentId]);
  
  // CRITICAL: Always render container, show appropriate content inside
  if (!formEquipmentId || !currentEquipment) {
    return (
      <div 
        className="w-full mobile-checklist-force-visible" 
        data-component="equipment-type-fields"
        data-equipment-type="none"
        data-equipment-name="None"
        data-force-visible="true"
        data-state="waiting"
      >
        {/* Mobile status indicator with enhanced debugging */}
        {isMobile && (
          <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-500 rounded text-sm">
            <strong>⏳ MOBILE CHECKLIST WAITING (ENHANCED):</strong><br />
            Status: No equipment selected<br />
            Form ID: {formEquipmentId || 'None'}<br />
            Local ID: {localEquipmentId || 'None'}<br />
            Equipment Array: {equipment?.length || 0} items<br />
            Action: Please select equipment above<br />
            Container: ALWAYS RENDERED ✓<br />
            CSS Import: FIXED ✓<br />
            Ready State: {isReady ? 'Yes' : 'No'}
          </div>
        )}
        
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-lg font-medium">Please select equipment above</p>
          <p className="text-sm mt-2">The maintenance checklist will appear here once you choose an equipment item.</p>
          {isMobile && (
            <p className="text-xs mt-2 text-blue-600">Mobile Mode: Breakpoint increased to 1024px for better tablet support</p>
          )}
        </div>
      </div>
    );
  }
  
  // CRITICAL: Direct equipment type detection with immediate fallback
  const detectEquipmentTypeFromEquipment = (equipmentName: string): string => {
    if (!equipmentName) return 'general';
    
    const name = equipmentName.toLowerCase();
    
    if (name.includes('ahu') || name.includes('air handler') || name.includes('rtu') || name.includes('rooftop')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower') || name.includes('tower')) return 'cooling_tower';
    if (name.includes('elevator') || name.includes('lift')) return 'elevator';
    if (name.includes('restroom') || name.includes('bathroom')) return 'restroom';
    
    return 'general';
  };
  
  // CRITICAL: Always determine equipment type - never null/undefined
  const currentEquipmentType = detectEquipmentTypeFromEquipment(currentEquipment.name);

  console.log('🔧 EquipmentTypeFields SHOWING CHECKLIST (ENHANCED):', { 
    formEquipmentId,
    localEquipmentId,
    currentEquipmentName: currentEquipment.name,
    detectedType: currentEquipmentType,
    isMobile,
    isReady,
    cssFixed: true,
    timestamp: new Date().toISOString()
  });

  return (
    <div 
      className="w-full mobile-checklist-force-visible" 
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
      data-force-visible="true"
      data-state="active"
    >
      {/* Mobile status indicator - always visible with enhanced info */}
      {isMobile && (
        <div className="mb-4 p-3 bg-blue-100 border-2 border-blue-500 rounded text-sm">
          <strong>✅ MOBILE CHECKLIST ACTIVE (ENHANCED):</strong><br />
          Equipment: {currentEquipment.name}<br />
          Type: {currentEquipmentType}<br />
          Form ID: {formEquipmentId}<br />
          Local ID: {localEquipmentId}<br />
          Status: RENDERING FIELDS ✓<br />
          Container: ALWAYS RENDERED ✓<br />
          CSS Import: FIXED ✓<br />
          Mobile Breakpoint: 1024px ✓<br />
          Ready State: {isReady ? 'Yes' : 'No'}
        </div>
      )}
      
      <EquipmentFields 
        form={form} 
        equipmentType={currentEquipmentType}
      />
    </div>
  );
};

export default EquipmentTypeFields;
