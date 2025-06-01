
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Get form equipment ID directly for reliable detection
  const formEquipmentId = form.watch('equipment_id');
  
  // CRITICAL: Multiple equipment detection strategies for maximum reliability
  const fallbackEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  const currentEquipment = selectedEquipment || fallbackEquipment;
  
  // CRITICAL: Show checklist if we have ANY equipment reference - prioritize form state
  const hasEquipment = !!(formEquipmentId || selectedEquipment || fallbackEquipment);
  const shouldShowChecklist = hasEquipment;

  console.log('🔧 MaintenanceFormBody CRITICAL DEBUG:', { 
    formEquipmentId,
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    fallbackEquipmentName: fallbackEquipment?.name,
    currentEquipmentName: currentEquipment?.name,
    hasEquipment,
    shouldShowChecklist,
    isMobile,
    equipmentArrayLength: equipment.length,
    timestamp: new Date().toISOString()
  });

  // Force checklist visibility logging for mobile debugging
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE CHECKLIST VISIBILITY DECISION:', {
        formEquipmentId,
        selectedEquipmentName: selectedEquipment?.name,
        fallbackEquipmentName: fallbackEquipment?.name,
        hasEquipment,
        shouldShowChecklist,
        checklistWillRender: shouldShowChecklist,
        timestamp: new Date().toISOString()
      });
    }
  }, [formEquipmentId, selectedEquipment, fallbackEquipment, hasEquipment, shouldShowChecklist, isMobile]);

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: Show checklist based on shouldShowChecklist flag */}
      {shouldShowChecklist && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full mobile-checklist-visible" 
            data-component="equipment-details-wrapper"
            data-mobile-visible={isMobile ? 'true' : 'false'}
            data-equipment-id={currentEquipment?.id || formEquipmentId}
            data-equipment-name={currentEquipment?.name}
            data-has-equipment={shouldShowChecklist ? 'true' : 'false'}
            data-should-show-checklist={shouldShowChecklist ? 'true' : 'false'}
          >
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      {/* Enhanced mobile debugging section */}
      {isMobile && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm mobile-debug-info">
          <strong>🔧 Mobile Equipment Debug:</strong><br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Selected Equipment: {selectedEquipment?.name || 'None'}<br />
          Fallback Equipment: {fallbackEquipment?.name || 'None'}<br />
          Current Equipment: {currentEquipment?.name || 'None'}<br />
          Has Equipment: {hasEquipment ? 'Yes' : 'No'}<br />
          Should Show Checklist: {shouldShowChecklist ? 'YES' : 'NO'}<br />
          Checklist Rendered: {shouldShowChecklist ? 'YES - VISIBLE' : 'NO - HIDDEN'}<br />
          Equipment Array Length: {equipment.length}<br />
          Is Mobile: {isMobile ? 'Yes' : 'No'}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={currentEquipment?.id || formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
