
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Check BOTH form state AND context for equipment selection
  const formEquipmentId = form.watch('equipment_id');
  const hasEquipment = !!(formEquipmentId || selectedEquipment);

  console.log('🔧 MaintenanceFormBody render:', { 
    selectedEquipment: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    formEquipmentId,
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
        hasEquipment,
        contextHasEquipment: !!selectedEquipment,
        formHasEquipmentId: !!formEquipmentId,
        timestamp: new Date().toISOString()
      });
    }
  }, [selectedEquipment, formEquipmentId, isMobile, form, hasEquipment]);

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: Show checklist if EITHER form has equipment OR context has equipment */}
      {hasEquipment && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full" 
            data-component="equipment-details-wrapper"
            data-mobile-visible={isMobile ? 'true' : 'false'}
            data-equipment-id={selectedEquipment?.id || formEquipmentId}
            data-equipment-name={selectedEquipment?.name}
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
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm"
          style={{ display: 'block', visibility: 'visible' }}
        >
          <strong>Mobile Debug Info:</strong><br />
          Selected Equipment: {selectedEquipment?.name || 'None'}<br />
          Equipment ID: {selectedEquipment?.id || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Has Equipment: {hasEquipment ? 'Yes' : 'No'}<br />
          Form Has Equipment: {formEquipmentId ? 'Yes' : 'No'}<br />
          Context Has Equipment: {selectedEquipment ? 'Yes' : 'No'}<br />
          Is Mobile: {isMobile ? 'Yes' : 'No'}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={selectedEquipment?.id || formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
