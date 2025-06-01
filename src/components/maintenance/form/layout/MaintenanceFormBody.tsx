
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Use ONLY form state for rendering decisions - bypass context
  const formEquipmentId = form.watch('equipment_id');
  
  // CRITICAL: Simple direct lookup - no context dependencies
  const hasEquipmentSelected = !!(formEquipmentId && equipment && equipment.length > 0);
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  // CRITICAL: Force checklist to show if we have equipment ID and equipment array
  const shouldShowChecklist = hasEquipmentSelected;

  console.log('🔧 MaintenanceFormBody BYPASS CONTEXT DEBUG:', { 
    formEquipmentId,
    equipmentArrayLength: equipment?.length || 0,
    hasEquipmentSelected,
    shouldShowChecklist,
    currentEquipmentName: currentEquipment?.name || 'None',
    isMobile,
    timestamp: new Date().toISOString()
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
      
      {/* CRITICAL: Show checklist based ONLY on form state - no context dependencies */}
      {shouldShowChecklist && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full mobile-checklist-force-visible" 
            data-component="equipment-details-wrapper"
            data-mobile-visible="true"
            data-equipment-id={formEquipmentId}
            data-equipment-name={currentEquipment?.name || 'Unknown'}
            data-force-visible="true"
            style={{
              display: 'block !important',
              visibility: 'visible !important',
              opacity: '1 !important'
            }}
          >
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      {/* Mobile debugging - always show when equipment selected */}
      {isMobile && shouldShowChecklist && (
        <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-sm mobile-debug-info">
          <strong>✅ MOBILE CHECKLIST STATUS:</strong><br />
          Equipment Selected: {currentEquipment?.name || 'Unknown'}<br />
          Form Equipment ID: {formEquipmentId}<br />
          Has Equipment Array: {equipment?.length > 0 ? 'Yes' : 'No'}<br />
          Should Show Checklist: {shouldShowChecklist ? 'YES - SHOWING' : 'NO'}<br />
          Checklist Container: FORCED VISIBLE<br />
          Timestamp: {new Date().toLocaleString()}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
