
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipment, isMobile } = useMaintenanceFormContext();

  // CRITICAL: Direct form state lookup - no context dependencies
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  // CRITICAL: Handle "no equipment selected" state gracefully
  if (!formEquipmentId || !currentEquipment) {
    return (
      <div 
        className="w-full mobile-checklist-force-visible" 
        data-component="equipment-type-fields"
        data-equipment-type="none"
        data-equipment-name="None"
        data-force-visible="true"
      >
        {/* Mobile status indicator */}
        {isMobile && (
          <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-500 rounded text-sm">
            <strong>⏳ MOBILE CHECKLIST WAITING:</strong><br />
            Status: No equipment selected<br />
            Form ID: {formEquipmentId || 'None'}<br />
            Equipment Array: {equipment?.length || 0} items<br />
            Action: Please select equipment above
          </div>
        )}
        
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg font-medium">Please select equipment above</p>
          <p className="text-sm mt-2">The maintenance checklist will appear here once you choose an equipment item.</p>
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

  console.log('🔧 EquipmentTypeFields SHOWING CHECKLIST:', { 
    formEquipmentId,
    currentEquipmentName: currentEquipment.name,
    detectedType: currentEquipmentType,
    isMobile,
    timestamp: new Date().toISOString()
  });

  return (
    <div 
      className="w-full mobile-checklist-force-visible" 
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
      data-force-visible="true"
    >
      {/* Mobile status indicator - always visible */}
      {isMobile && (
        <div className="mb-4 p-3 bg-blue-100 border-2 border-blue-500 rounded text-sm">
          <strong>✅ MOBILE CHECKLIST ACTIVE:</strong><br />
          Equipment: {currentEquipment.name}<br />
          Type: {currentEquipmentType}<br />
          Form ID: {formEquipmentId}<br />
          Status: RENDERING FIELDS
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
