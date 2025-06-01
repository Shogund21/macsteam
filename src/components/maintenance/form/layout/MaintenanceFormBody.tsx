
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  console.log('🔧 MaintenanceFormBody render:', { 
    equipmentId, 
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    shouldShowChecklist: !!equipmentId,
    formValues: form.getValues()
  });

  // CRITICAL: Enhanced mobile debugging for equipment checklist visibility
  React.useEffect(() => {
    if (isMobile) {
      console.log('🔧 MOBILE CHECKLIST VISIBILITY DEBUG:', {
        equipmentId,
        hasEquipmentId: !!equipmentId,
        selectedEquipment: selectedEquipment?.name,
        shouldRenderChecklist: !!equipmentId,
        timestamp: new Date().toISOString()
      });
    }
  }, [equipmentId, selectedEquipment, isMobile]);

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: Always render equipment checklist section when equipment is selected - Enhanced for mobile */}
      {equipmentId && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full" 
            data-component="equipment-details-wrapper"
            data-mobile-visible={isMobile ? 'true' : 'false'}
            data-equipment-id={equipmentId}
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

      {/* CRITICAL: Mobile debugging section - temporary for troubleshooting */}
      {isMobile && (
        <div 
          className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm"
          style={{ display: 'block', visibility: 'visible' }}
        >
          <strong>Mobile Debug Info:</strong><br />
          Equipment ID: {equipmentId || 'None'}<br />
          Selected Equipment: {selectedEquipment?.name || 'None'}<br />
          Should Show Checklist: {equipmentId ? 'Yes' : 'No'}<br />
          Is Mobile: {isMobile ? 'Yes' : 'No'}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={equipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
