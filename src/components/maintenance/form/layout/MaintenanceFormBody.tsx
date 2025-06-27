
import React, { useEffect, useMemo } from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  const formEquipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');

  console.log('🔧 MaintenanceFormBody render:', { 
    isMobile,
    formEquipmentId,
    locationId,
    equipmentCount: equipment?.length || 0,
    timestamp: new Date().toISOString()
  });

  // Memoize sections to prevent unnecessary re-renders
  const basicInfoSection = useMemo(() => (
    <FormSection title="Basic Information">
      <div className="w-full">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </div>
    </FormSection>
  ), [form, equipment, technicians]);

  const equipmentSection = useMemo(() => {
    if (!formEquipmentId) return null;
    
    return (
      <div 
        className="w-full"
        data-component="equipment-details-wrapper"
      >
        <FormSection title="Equipment Maintenance Checklist">
          <div className="w-full">
            <EquipmentTypeFields />
          </div>
        </FormSection>
      </div>
    );
  }, [formEquipmentId]);

  const documentsSection = useMemo(() => (
    <FormSection title="Documents">
      <DocumentManager equipmentId={formEquipmentId} />
    </FormSection>
  ), [formEquipmentId]);

  return (
    <div 
      className={`w-full space-y-6 ${isMobile ? 'pb-4' : 'pb-8'}`} 
      data-component="maintenance-form-body"
    >
      {/* Basic Information Section */}
      {basicInfoSection}
      
      {/* Equipment Maintenance Checklist */}
      {equipmentSection}

      {/* Documents */}
      {documentsSection}
    </div>
  );
};

export default MaintenanceFormBody;
