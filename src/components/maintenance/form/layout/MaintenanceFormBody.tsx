
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile, selectedEquipment, equipmentType } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  console.log('MaintenanceFormBody: 📱 MOBILE RENDERING DEBUG:', { 
    isMobile, 
    equipmentId, 
    equipmentType,
    selectedEquipmentName: selectedEquipment?.name,
    hasEquipmentId: !!equipmentId,
    shouldShowFields: !!equipmentId,
    timestamp: new Date().toISOString()
  });

  // Additional mobile-specific debugging
  if (isMobile) {
    console.log('MaintenanceFormBody: 📱 MOBILE SPECIFIC CHECK:', {
      equipmentAvailable: equipment?.length || 0,
      techniciansAvailable: technicians?.length || 0,
      formValues: form.getValues(),
      watchedEquipmentId: form.watch('equipment_id')
    });
  }

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
