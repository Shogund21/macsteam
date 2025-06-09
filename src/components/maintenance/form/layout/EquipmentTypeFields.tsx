
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
    hasEquipment: !!currentEquipment,
    equipmentList: equipment.map(eq => ({ id: eq.id, name: eq.name })),
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
      
      // On mobile, scroll to checklist after a delay to ensure it's rendered
      if (isMobile) {
        setTimeout(() => {
          const checklistElement = document.querySelector('[data-component="equipment-type-fields"]');
          if (checklistElement) {
            checklistElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      }
    } else if (formEquipmentId && !currentEquipment) {
      console.log('🔧 Equipment ID set but equipment not found:', {
        formEquipmentId,
        availableEquipment: equipment.map(eq => eq.id)
      });
    }
  }, [formEquipmentId, currentEquipment, isMobile, equipment]);

  // Return early if no equipment selected
  if (!formEquipmentId || !currentEquipment) {
    console.log('🔧 No equipment selected, not showing checklist:', { formEquipmentId, hasCurrentEquipment: !!currentEquipment });
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
      className={`w-full mobile-checklist-force-visible ${isMobile ? 'space-y-4 mobile-equipment-container' : 'space-y-6'}`}
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
      data-force-visible="true"
      key={`equipment-${formEquipmentId}`} // Force re-render on equipment change
      style={{ 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '200px',
        backgroundColor: isMobile ? '#f0f9ff' : 'transparent',
        padding: isMobile ? '1rem' : '0',
        borderRadius: isMobile ? '8px' : '0',
        border: isMobile ? '2px solid #0ea5e9' : 'none',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        overflow: isMobile ? 'visible' : 'initial'
      }}
    >
      <div 
        className={`mobile-checklist-force-visible ${isMobile ? 'bg-white p-4 rounded-lg shadow-sm' : ''}`} 
        data-force-visible="true"
        style={isMobile ? {
          width: '100%',
          minHeight: '200px',
          position: 'relative',
          overflow: 'visible'
        } : {}}
      >
        <EquipmentFields 
          form={form} 
          equipmentType={currentEquipmentType}
        />
      </div>
    </div>
  );
};

export default EquipmentTypeFields;
