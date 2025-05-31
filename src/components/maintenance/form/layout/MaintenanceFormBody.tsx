
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

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* Equipment checklist section - ALWAYS render when equipment is selected */}
      {equipmentId && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full" 
            data-component="equipment-details-wrapper"
          >
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
