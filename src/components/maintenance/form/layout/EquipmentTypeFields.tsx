
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, equipment, isMobile } = useMaintenanceFormContext();

  // CRITICAL: Multiple equipment detection strategies
  const formEquipmentId = form.watch('equipment_id');
  const fallbackEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  const currentEquipment = selectedEquipment || fallbackEquipment;
  
  // CRITICAL: Enhanced equipment type detection with immediate fallback
  const getCurrentEquipmentType = () => {
    // First try context equipment type
    if (equipmentType) return equipmentType;
    
    // Then try to detect from current equipment
    if (currentEquipment) {
      return detectEquipmentTypeFromName(currentEquipment.name);
    }
    
    // Always fallback to general to ensure checklist shows
    return 'general';
  };
  
  const currentEquipmentType = getCurrentEquipmentType();

  console.log('🔧 EquipmentTypeFields CRITICAL RENDER:', { 
    equipmentType: currentEquipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    fallbackEquipmentName: fallbackEquipment?.name,
    currentEquipmentName: currentEquipment?.name,
    formEquipmentId,
    contextEquipmentType: equipmentType,
    isMobile,
    timestamp: new Date().toISOString()
  });

  // Mobile-specific equipment type logging
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE EQUIPMENT TYPE FIELDS DEBUG:', {
        equipmentType: currentEquipmentType,
        contextEquipmentType: equipmentType,
        selectedEquipmentName: selectedEquipment?.name,
        fallbackEquipmentName: fallbackEquipment?.name,
        currentEquipmentName: currentEquipment?.name,
        formEquipmentId,
        willRenderEquipmentFields: true,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentEquipmentType, equipmentType, selectedEquipment, fallbackEquipment, currentEquipment, formEquipmentId, isMobile]);

  return (
    <div 
      className="w-full mobile-checklist-visible" 
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-mobile-debug={isMobile ? 'true' : 'false'}
      data-has-equipment={currentEquipment ? 'true' : 'false'}
      data-equipment-name={currentEquipment?.name || 'None'}
    >
      {/* Mobile debugging info */}
      {isMobile && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <strong>🔧 Equipment Type Debug:</strong><br />
          Equipment Type: {currentEquipmentType || 'Not detected'}<br />
          Equipment: {currentEquipment?.name || 'None selected'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Context Type: {equipmentType || 'None'}<br />
          Fallback Equipment: {fallbackEquipment?.name || 'None'}<br />
          <strong>Status: RENDERING EQUIPMENT FIELDS</strong>
        </div>
      )}
      
      <EquipmentFields 
        form={form} 
        equipmentType={currentEquipmentType}
      />
    </div>
  );
};

// Helper function to detect equipment type from name
const detectEquipmentTypeFromName = (equipmentName: string): string => {
  if (!equipmentName) return 'general';
  
  const name = equipmentName.toLowerCase();
  
  const ahuPatterns = ['ahu', 'air handler', 'air handling', 'air-handler', 'airhandler', 'ahu-', 'ahu ', 'ah-', 'ah ', 'rtu', 'roof top unit', 'rooftop unit', 'roof-top', 'rtu-', 'rtu '];
  const chillerPatterns = ['chiller', 'ch-', 'ch ', 'cooling unit', 'chiller-', 'chill'];
  const coolingTowerPatterns = ['cooling tower', 'cooling-tower', 'coolingtower', 'ct-', 'ct ', 'tower'];
  const elevatorPatterns = ['elevator', 'lift', 'elev', 'ele-', 'elevator-'];
  const restroomPatterns = ['restroom', 'bathroom', 'washroom', 'toilet', 'rest-', 'rr-'];
  
  if (ahuPatterns.some(pattern => name.includes(pattern))) return 'ahu';
  if (chillerPatterns.some(pattern => name.includes(pattern))) return 'chiller';
  if (coolingTowerPatterns.some(pattern => name.includes(pattern))) return 'cooling_tower';
  if (elevatorPatterns.some(pattern => name.includes(pattern))) return 'elevator';
  if (restroomPatterns.some(pattern => name.includes(pattern))) return 'restroom';
  
  return 'general';
};

export default EquipmentTypeFields;
