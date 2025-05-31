
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();

  console.log('MaintenanceFormBody rendering, isMobile:', isMobile);

  return (
    <div className="space-y-6">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      <FormSection title="Equipment Details">
        <EquipmentTypeFields />
      </FormSection>

      <FormSection title="Documents">
        <DocumentManager equipmentId={form.watch('equipment_id')} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
