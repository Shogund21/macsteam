
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Use selectedEquipment from context instead of form.watch for immediate UI response
  const shouldShowChecklist = !!selectedEquipment;

  console.log('🔧 MaintenanceFormBody render:', { 
    selectedEquipment: selectedEquipment?.name,
    selectedEquipmentId: selectedEquipment?.id,
    shouldShowChecklist,
    isMobile,
    formEquipmentId: form.watch('equipment_id'),
    formValues: form.getValues()
  });

  // Enhanced mobile debugging for equipment checklist visibility
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE CHECKLIST VISIBILITY DEBUG:', {
        selectedEquipment: selectedEquipment?.name,
        selectedEquipmentId: selectedEquipment?.id,
        shouldShowChecklist,
        formEquipmentId: form.watch('equipment_id'),
        contextHasEquipment: !!selectedEquipment,
        timestamp: new Date().toISOString()
      });
    }
  }, [selectedEquipment, isMobile, form]);

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: Use selectedEquipment from context for immediate rendering */}
      {shouldShowChecklist && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full" 
            data-component="equipment-details-wrapper"
            data-mobile-visible={isMobile ? 'true' : 'false'}
            data-equipment-id={selectedEquipment?.id}
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
          Form Equipment ID: {form.watch('equipment_id') || 'None'}<br />
          Should Show Checklist: {shouldShowChecklist ? 'Yes' : 'No'}<br />
          Is Mobile: {isMobile ? 'Yes' : 'No'}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={selectedEquipment?.id} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
