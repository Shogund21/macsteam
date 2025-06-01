
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

  console.log('🔧 MaintenanceFormBody ALWAYS RENDER CHECKLIST:', { 
    formEquipmentId,
    equipmentArrayLength: equipment?.length || 0,
    hasEquipmentSelected,
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
      
      {/* CRITICAL: ALWAYS render this section - REMOVED conditional barrier */}
      <FormSection title="Equipment Maintenance Checklist">
        <div 
          className="w-full mobile-checklist-force-visible" 
          data-component="equipment-details-wrapper"
          data-mobile-visible="true"
          data-equipment-id={formEquipmentId || 'none'}
          data-equipment-name={currentEquipment?.name || 'None Selected'}
          data-force-visible="true"
        >
          <EquipmentTypeFields />
        </div>
      </FormSection>

      {/* Mobile debugging - always show */}
      {isMobile && (
        <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-sm mobile-debug-info">
          <strong>✅ MOBILE CHECKLIST STATUS:</strong><br />
          Equipment Selected: {currentEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Has Equipment Array: {equipment?.length > 0 ? 'Yes' : 'No'}<br />
          Checklist Section: ALWAYS RENDERED<br />
          Content State: {hasEquipmentSelected ? 'SHOWING FIELDS' : 'SHOWING SELECT MESSAGE'}<br />
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
