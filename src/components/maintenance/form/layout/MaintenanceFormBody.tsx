
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';
import MobileEquipmentSelector from '../../mobile/MobileEquipmentSelector';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  const formEquipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');

  console.log('🔧 MaintenanceFormBody render:', { 
    isMobile,
    formEquipmentId,
    locationId,
    timestamp: new Date().toISOString()
  });

  return (
    <div className={`w-full space-y-6 ${isMobile ? 'pb-20' : ''}`} data-component="maintenance-form-body">
      {/* Basic Information Section */}
      <FormSection title="Basic Information">
        <div className="space-y-4">
          {isMobile ? (
            // Mobile-specific layout with mobile equipment selector
            <div className="space-y-4">
              <MaintenanceBasicInfo 
                form={form} 
                equipment={equipment} 
                technicians={technicians} 
              />
              
              {/* Mobile Equipment Selector */}
              <div className="w-full">
                <MobileEquipmentSelector
                  form={form}
                  locationId={locationId || ''}
                />
              </div>
            </div>
          ) : (
            // Desktop layout
            <div className="w-full">
              <MaintenanceBasicInfo 
                form={form} 
                equipment={equipment} 
                technicians={technicians} 
              />
            </div>
          )}
        </div>
      </FormSection>
      
      {/* Equipment Maintenance Checklist - Use existing responsive component */}
      <FormSection title="Equipment Maintenance Checklist">
        <div className="w-full">
          <EquipmentTypeFields />
        </div>
      </FormSection>

      {/* Documents */}
      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
