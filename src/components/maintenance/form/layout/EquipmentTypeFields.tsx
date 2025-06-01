
import React, { useEffect } from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');
  
  console.log('EquipmentTypeFields: 🔧 MOBILE COMPREHENSIVE DEBUG:', { 
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    formEquipmentId: equipmentId,
    isMobile,
    hasEquipmentId: !!equipmentId,
    hasEquipmentType: !!equipmentType,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    timestamp: new Date().toISOString()
  });

  // Add effect to monitor equipment type changes with mobile-specific logging
  useEffect(() => {
    console.log('EquipmentTypeFields: 🔄 MOBILE EQUIPMENT TYPE EFFECT TRIGGERED:', {
      newEquipmentType: equipmentType,
      selectedEquipment: selectedEquipment?.name,
      isMobile,
      shouldRender: !!equipmentId && !!equipmentType,
      renderingConditions: {
        hasEquipmentId: !!equipmentId,
        hasEquipmentType: !!equipmentType,
        bothConditionsMet: !!equipmentId && !!equipmentType
      }
    });
  }, [equipmentType, selectedEquipment, isMobile, equipmentId]);

  // Enhanced early return logging for mobile
  if (!equipmentId) {
    console.log('EquipmentTypeFields: ❌ MOBILE - NO EQUIPMENT ID - NOT RENDERING:', {
      equipmentId,
      formValues: form.getValues(),
      isMobile,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown'
    });
    return null;
  }

  if (!equipmentType) {
    console.log('EquipmentTypeFields: ❌ MOBILE - NO EQUIPMENT TYPE - NOT RENDERING:', {
      equipmentType,
      selectedEquipment: selectedEquipment?.name,
      equipmentId,
      isMobile,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown'
    });
    return null;
  }

  console.log('EquipmentTypeFields: ✅ MOBILE - RENDERING EQUIPMENT FIELDS:', {
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    cssClass: isMobile ? 'mobile-equipment-fields' : 'desktop-equipment-fields'
  });
  
  return (
    <div className={isMobile ? 'mobile-equipment-fields' : ''}>
      {/* Mobile debugging indicator */}
      {isMobile && (
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '8px', 
          margin: '8px 0', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#1565c0'
        }}>
          📱 Mobile Debug: Rendering {equipmentType} fields for {selectedEquipment?.name}
        </div>
      )}
      <EquipmentFields form={form} equipmentType={equipmentType} />
    </div>
  );
};

export default EquipmentTypeFields;
