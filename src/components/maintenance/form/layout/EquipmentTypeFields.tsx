
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipment, isMobile } = useMaintenanceFormContext();
  
  // Direct form state lookup - simple and immediate
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  // Show message if no equipment selected
  if (!formEquipmentId || !currentEquipment) {
    return (
      <div 
        className="w-full" 
        data-component="equipment-type-fields"
        data-state="waiting"
        style={isMobile ? {
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          overflow: 'visible',
          minHeight: '100px'
        } : {}}
      >
        {isMobile && (
          <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-500 rounded text-sm">
            <strong>⏳ MOBILE CHECKLIST WAITING:</strong><br />
            Status: No equipment selected<br />
            Form ID: {formEquipmentId || 'None'}<br />
            Equipment Array: {equipment?.length || 0} items<br />
            Action: Please select equipment above
          </div>
        )}
        
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-lg font-medium">Please select equipment above</p>
          <p className="text-sm mt-2">The maintenance checklist will appear here once you choose an equipment item.</p>
        </div>
      </div>
    );
  }
  
  // Simple equipment type detection
  const detectEquipmentType = (equipmentName: string): string => {
    if (!equipmentName) return 'general';
    
    const name = equipmentName.toLowerCase();
    
    if (name.includes('ahu') || name.includes('air handler') || name.includes('rtu') || name.includes('rooftop')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower') || name.includes('tower')) return 'cooling_tower';
    if (name.includes('elevator') || name.includes('lift')) return 'elevator';
    if (name.includes('restroom') || name.includes('bathroom')) return 'restroom';
    
    return 'general';
  };
  
  const currentEquipmentType = detectEquipmentType(currentEquipment.name);

  console.log('🔧 EquipmentTypeFields SHOWING CHECKLIST:', { 
    formEquipmentId,
    currentEquipmentName: currentEquipment.name,
    detectedType: currentEquipmentType,
    isMobile
  });

  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
      data-state="active"
      style={isMobile ? {
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        overflow: 'visible',
        minHeight: '100px'
      } : {}}
    >
      {isMobile && (
        <div className="mb-4 p-3 bg-green-100 border-2 border-green-500 rounded text-sm">
          <strong>✅ MOBILE CHECKLIST ACTIVE:</strong><br />
          Equipment: {currentEquipment.name}<br />
          Type: {currentEquipmentType}<br />
          Form ID: {formEquipmentId}<br />
          Status: RENDERING FIELDS ✓
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
