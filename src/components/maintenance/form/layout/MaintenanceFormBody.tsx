
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');
  const technicianId = form.watch('technician_id');

  // MOBILE DEBUG: Enhanced logging for checklist display decision
  console.log('🔧 MaintenanceFormBody MOBILE DEBUG - Render Analysis:', { 
    equipmentId, 
    locationId,
    technicianId,
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    shouldShowChecklist: !!equipmentId && equipmentId !== '',
    formValues: form.getValues(),
    equipmentIdType: typeof equipmentId,
    equipmentIdLength: equipmentId?.length,
    hasSelectedEquipment: !!selectedEquipment,
    timestamp: new Date().toISOString()
  });

  // MOBILE FIX: Ensure checklist shows when equipment is selected
  const shouldShowEquipmentChecklist = !!(equipmentId && equipmentId !== '' && equipmentId !== 'loading-placeholder' && equipmentId !== 'no-equipment-placeholder');

  console.log('🔧 MaintenanceFormBody MOBILE - Checklist Display Decision:', {
    shouldShowEquipmentChecklist,
    equipmentId,
    isMobile,
    renderingChecklist: shouldShowEquipmentChecklist
  });

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* MOBILE FIX: Enhanced equipment checklist section with better conditional logic */}
      {shouldShowEquipmentChecklist && (
        <>
          <FormSection title="Equipment Maintenance Checklist">
            <div 
              className="w-full" 
              data-component="equipment-details-wrapper"
              data-mobile={isMobile}
              data-equipment-id={equipmentId}
            >
              <EquipmentTypeFields />
            </div>
          </FormSection>
          
          {/* MOBILE DEBUG: Temporary debug section - remove after testing */}
          {isMobile && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs">
              <div className="font-semibold text-yellow-800">Mobile Debug Info:</div>
              <div>Equipment ID: {equipmentId}</div>
              <div>Equipment Name: {selectedEquipment?.name || 'Not found'}</div>
              <div>Should Show Checklist: {shouldShowEquipmentChecklist ? 'YES' : 'NO'}</div>
              <div>Is Mobile: {isMobile ? 'YES' : 'NO'}</div>
            </div>
          )}
        </>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={equipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
