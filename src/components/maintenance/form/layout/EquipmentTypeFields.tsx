
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
    return (
      <div style={{ 
        backgroundColor: '#ffebee', 
        padding: '12px', 
        margin: '8px 0', 
        borderRadius: '6px',
        fontSize: '14px',
        color: '#c62828',
        border: '1px solid #ef5350'
      }}>
        ❌ No equipment selected. Please select equipment to see maintenance fields.
      </div>
    );
  }

  if (!equipmentType) {
    console.log('EquipmentTypeFields: ❌ MOBILE - NO EQUIPMENT TYPE - NOT RENDERING:', {
      equipmentType,
      selectedEquipment: selectedEquipment?.name,
      equipmentId,
      isMobile,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown'
    });
    return (
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '12px', 
        margin: '8px 0', 
        borderRadius: '6px',
        fontSize: '14px',
        color: '#ef6c00',
        border: '1px solid #ffb74d'
      }}>
        ⚠️ Equipment type not detected. Equipment ID: {equipmentId}, Selected: {selectedEquipment?.name || 'Unknown'}
      </div>
    );
  }

  console.log('EquipmentTypeFields: ✅ MOBILE - RENDERING EQUIPMENT FIELDS:', {
    equipmentType, 
    selectedEquipmentName: selectedEquipment?.name,
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    cssClass: isMobile ? 'mobile-equipment-fields' : 'desktop-equipment-fields'
  });
  
  return (
    <div className={isMobile ? 'mobile-equipment-fields' : ''} style={{ width: '100%', minHeight: '200px' }}>
      {/* Mobile debugging indicator */}
      {isMobile && (
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '12px', 
          margin: '8px 0', 
          borderRadius: '6px',
          fontSize: '13px',
          color: '#2e7d32',
          border: '2px solid #4caf50',
          fontWeight: 'bold'
        }}>
          ✅ Mobile Debug: Rendering {equipmentType} fields for {selectedEquipment?.name}
        </div>
      )}
      
      {/* Force render equipment fields */}
      <div style={{ width: '100%', display: 'block', visibility: 'visible', opacity: 1 }}>
        <EquipmentFields form={form} equipmentType={equipmentType} />
      </div>
    </div>
  );
};

export default EquipmentTypeFields;
