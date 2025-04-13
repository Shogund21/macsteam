
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians } = useMaintenanceFormContext();

  return (
    <>
      <FormSection>
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      <FormSection>
        <EquipmentTypeFields />
      </FormSection>

      <FormSection>
        <DocumentManager equipmentId={form.watch('equipment_id')} />
      </FormSection>
    </>
  );
};

export default MaintenanceFormBody;
