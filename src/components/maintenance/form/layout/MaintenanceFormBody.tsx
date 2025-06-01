
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Prioritize form state over context for mobile reliability
  const formEquipmentId = form.watch('equipment_id');
  
  // Add direct equipment lookup as fallback to context
  const fallbackEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  const currentEquipment = selectedEquipment || fallbackEquipment;
  
  // Show checklist if we have ANY equipment reference
  const hasEquipment = !!(formEquipmentId || selectedEquipment || fallbackEquipment);

  console.log('🔧 MaintenanceFormBody render:', { 
    selectedEquipment: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    formEquipmentId,
    fallbackEquipment: fallbackEquipment?.name,
    currentEquipment: currentEquipment?.name,
    hasEquipment,
    isMobile,
    formValues: form.getValues()
  });

  // Enhanced mobile debugging for equipment checklist visibility
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE CHECKLIST VISIBILITY DEBUG:', {
        selectedEquipment: selectedEquipment?.name,
        selectedEquipmentId: selectedEquipment?.id,
        formEquipmentId,
        fallbackEquipment: fallbackEquipment?.name,
        currentEquipment: currentEquipment?.name,
        hasEquipment,
        contextHasEquipment: !!selectedEquipment,
        formHasEquipmentId: !!formEquipmentId,
        fallbackFound: !!fallbackEquipment,
        timestamp: new Date().toISOString()
      });
    }
  }, [selectedEquipment, formEquipmentId, fallbackEquipment, currentEquipment, isMobile, form, hasEquipment]);

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: Show checklist if ANY equipment is available */}
      {hasEquipment && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full mobile-checklist-visible" 
            data-component="equipment-details-wrapper"
            data-mobile-visible={isMobile ? 'true' : 'false'}
            data-equipment-id={currentEquipment?.id || formEquipmentId}
            data-equipment-name={currentEquipment?.name}
            data-has-equipment={hasEquipment ? 'true' : 'false'}
            style={{
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              minHeight: '100px'
            }}
          >
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      {/* Enhanced mobile debugging section */}
      {isMobile && (
        <div 
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm mobile-debug-info"
          style={{ display: 'block', visibility: 'visible' }}
        >
          <strong>Mobile Debug Info:</strong><br />
          Selected Equipment: {selectedEquipment?.name || 'None'}<br />
          Equipment ID: {selectedEquipment?.id || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Fallback Equipment: {fallbackEquipment?.name || 'None'}<br />
          Current Equipment: {currentEquipment?.name || 'None'}<br />
          Has Equipment: {hasEquipment ? 'Yes' : 'No'}<br />
          Form Has Equipment: {formEquipmentId ? 'Yes' : 'No'}<br />
          Context Has Equipment: {selectedEquipment ? 'Yes' : 'No'}<br />
          Fallback Found: {fallbackEquipment ? 'Yes' : 'No'}<br />
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
