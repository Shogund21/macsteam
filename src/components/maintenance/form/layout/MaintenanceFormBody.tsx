
import React, { useEffect } from 'react';
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

  // Force re-render when equipment changes on mobile
  useEffect(() => {
    if (isMobile && formEquipmentId) {
      console.log('🔧 Mobile equipment changed, forcing update:', formEquipmentId);
      // Trigger form validation to ensure all components update
      form.trigger();
    }
  }, [formEquipmentId, isMobile, form]);

  return (
    <div className={`w-full space-y-6 ${isMobile ? 'pb-20' : ''}`} data-component="maintenance-form-body">
      {/* Basic Information Section */}
      <FormSection title="Basic Information">
        <div className="space-y-4">
          {/* Universal basic info component - works on all devices now */}
          <div className="w-full">
            <MaintenanceBasicInfo 
              form={form} 
              equipment={equipment} 
              technicians={technicians} 
            />
          </div>
        </div>
      </FormSection>
      
      {/* Equipment Maintenance Checklist - Always render when equipment is selected */}
      {formEquipmentId && (
        <FormSection title="Equipment Maintenance Checklist">
          <div className="w-full">
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      {/* Documents */}
      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
