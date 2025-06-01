
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, equipment, isMobile } = useMaintenanceFormContext();

  // Get equipment from form if context doesn't have it yet
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = selectedEquipment || equipment.find(eq => eq.id === formEquipmentId);
  
  // Get equipment type from context or detect it locally
  const currentEquipmentType = equipmentType || (currentEquipment ? detectEquipmentTypeFromName(currentEquipment.name) : null);

  console.log('🔧 EquipmentTypeFields rendering:', { 
    equipmentType: currentEquipmentType, 
    selectedEquipment: currentEquipment?.name,
    formEquipmentId,
    isMobile
  });

  // CRITICAL: Enhanced mobile debugging and force visibility
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE EQUIPMENT TYPE FIELDS DEBUG:', {
        equipmentType: currentEquipmentType,
        selectedEquipmentName: currentEquipment?.name,
        selectedEquipmentId: currentEquipment?.id,
        formEquipmentId,
        isMobile,
        timestamp: new Date().toISOString()
      });
    }
  }, [currentEquipmentType, currentEquipment, formEquipmentId, isMobile]);

  return (
    <div 
      className="w-full" 
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-mobile-debug={isMobile ? 'true' : 'false'}
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '50px'
      }}
    >
      {/* Mobile debugging info */}
      {isMobile && (
        <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
          <strong>Equipment Type Debug:</strong> {currentEquipmentType || 'Not detected'}<br />
          <strong>Equipment:</strong> {currentEquipment?.name || 'None selected'}<br />
          <strong>Form Equipment ID:</strong> {formEquipmentId || 'None'}
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
const detectEquipmentTypeFromName = (equipmentName: string): string | null => {
  if (!equipmentName) return null;
  
  const name = equipmentName.toLowerCase();
  
  // Enhanced AHU/RTU detection patterns
  const ahuPatterns = [
    'ahu', 'air handler', 'air handling', 'air-handler', 'airhandler',
    'ahu-', 'ahu ', 'ah-', 'ah ', 'rtu', 'roof top unit', 'rooftop unit',
    'roof-top', 'rtu-', 'rtu '
  ];
  
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
