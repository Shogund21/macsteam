
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile, selectedEquipment, equipmentType } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  console.log('MaintenanceFormBody: 📱 MOBILE COMPREHENSIVE DEBUG:', { 
    isMobile, 
    equipmentId, 
    equipmentType,
    selectedEquipmentName: selectedEquipment?.name,
    hasEquipmentId: !!equipmentId,
    shouldShowFields: !!equipmentId,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    timestamp: new Date().toISOString()
  });

  // Additional mobile-specific debugging with form state
  if (isMobile) {
    console.log('MaintenanceFormBody: 📱 MOBILE FORM STATE DEBUG:', {
      equipmentAvailable: equipment?.length || 0,
      techniciansAvailable: technicians?.length || 0,
      allFormValues: form.getValues(),
      watchedEquipmentId: form.watch('equipment_id'),
      watchedLocationId: form.watch('location_id'),
      selectedEquipmentDetails: selectedEquipment ? {
        id: selectedEquipment.id,
        name: selectedEquipment.name
      } : null,
      formErrors: form.formState.errors,
      formIsDirty: form.formState.isDirty,
      formIsValid: form.formState.isValid
    });
  }

  // Enhanced render decision logging
  console.log('MaintenanceFormBody: 🔄 MOBILE RENDER DECISION:', {
    equipmentId,
    equipmentType,
    willShowEquipmentSection: !!equipmentId,
    isMobile,
    renderingConditions: {
      hasEquipmentId: !!equipmentId,
      hasEquipmentType: !!equipmentType,
      hasSelectedEquipment: !!selectedEquipment,
      allConditionsMet: !!equipmentId && !!equipmentType && !!selectedEquipment
    }
  });

  return (
    <div className="space-y-6">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {equipmentId && (
        <FormSection title="Equipment Details">
          {/* Mobile debugging indicator */}
          {isMobile && (
            <div style={{ 
              backgroundColor: '#fef3c7', 
              padding: '8px 12px', 
              borderRadius: '4px',
              fontSize: '12px',
              color: '#92400e',
              marginBottom: '12px',
              border: '1px solid #fbbf24'
            }}>
              📱 Mobile Equipment Section: {selectedEquipment?.name || 'Unknown'} ({equipmentType || 'No type'})
            </div>
          )}
          <div className={isMobile ? 'mobile-equipment-fields' : ''}>
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={equipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
