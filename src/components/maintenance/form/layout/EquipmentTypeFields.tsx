
import React, { useEffect } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipment, isMobile } = useMaintenanceFormContext();

  // Get form values directly with forced re-render
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  console.log('🔧 EquipmentTypeFields render:', { 
    formEquipmentId,
    currentEquipmentName: currentEquipment?.name || 'None',
    equipmentCount: equipment?.length || 0,
    isMobile,
    timestamp: new Date().toISOString()
  });

  // Force component update when equipment changes
  useEffect(() => {
    if (formEquipmentId && currentEquipment) {
      console.log('🔧 Equipment selected for checklist:', {
        id: formEquipmentId,
        name: currentEquipment.name,
        isMobile
      });
    }
  }, [formEquipmentId, currentEquipment, isMobile]);

  // Return early if no equipment selected
  if (!formEquipmentId || !currentEquipment) {
    console.log('🔧 No equipment selected, not showing checklist');
    return null;
  }
  
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
  
  const currentEquipmentType = detectEquipmentType(currentEquipment.name);

  console.log('🔧 EquipmentTypeFields showing checklist:', { 
    equipmentName: currentEquipment.name,
    detectedType: currentEquipmentType,
    isMobile
  });

  return (
    <div 
      className={`w-full ${isMobile ? 'space-y-4' : 'space-y-6'}`}
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
      key={`equipment-${formEquipmentId}`} // Force re-render on equipment change
    >
      {isMobile && (
        <div className="p-3 bg-green-100 border border-green-400 rounded text-sm">
          <strong>✅ Mobile Checklist Active:</strong><br />
          Equipment: {currentEquipment.name}<br />
          Type: {currentEquipmentType}<br />
          Status: Displaying maintenance fields
        </div>
      )}
      
      <div className={`${isMobile ? 'bg-white p-4 rounded-lg shadow-sm' : ''}`}>
        <EquipmentFields 
          form={form} 
          equipmentType={currentEquipmentType}
        />
      </div>
    </div>
  );
};

export default EquipmentTypeFields;
