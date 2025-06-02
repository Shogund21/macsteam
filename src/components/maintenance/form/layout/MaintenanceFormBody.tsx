import React, { useState } from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';
import MobileEquipmentSelector from '../../mobile/MobileEquipmentSelector';
import MobileMaintenanceChecklist from '../../mobile/MobileMaintenanceChecklist';
import { Equipment } from '@/types/maintenance';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  // Mobile-specific state for immediate checklist display
  const [mobileSelectedEquipment, setMobileSelectedEquipment] = useState<Equipment | null>(null);
  
  const formEquipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');

  console.log('🔧 MaintenanceFormBody render:', { 
    isMobile,
    formEquipmentId,
    locationId,
    hasMobileSelection: !!mobileSelectedEquipment,
    mobileEquipmentName: mobileSelectedEquipment?.name || 'None',
    timestamp: new Date().toISOString()
  });

  const handleMobileEquipmentSelected = (selectedEquipment: Equipment | null) => {
    console.log('🔧 Mobile equipment selected in MaintenanceFormBody:', {
      equipmentName: selectedEquipment?.name || 'None',
      equipmentId: selectedEquipment?.id || 'None'
    });
    setMobileSelectedEquipment(selectedEquipment);
  };

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <div className="space-y-4">
          {/* Location and Technician Selection - Always use standard components */}
          <div className="space-y-4">
            <div className="w-full">
              <label className="block text-base font-semibold text-gray-700 mb-2">Location</label>
              <div className="w-full">
                {/* Use existing LocationSelect from MaintenanceBasicInfo but extract location logic */}
                <MaintenanceBasicInfo 
                  form={form} 
                  equipment={equipment} 
                  technicians={technicians} 
                />
              </div>
            </div>
          </div>

          {/* Equipment Selection - Mobile vs Desktop */}
          {isMobile ? (
            <div className="w-full">
              <MobileEquipmentSelector
                form={form}
                locationId={locationId || ''}
                onEquipmentSelected={handleMobileEquipmentSelected}
              />
            </div>
          ) : null}
        </div>
      </FormSection>
      
      {/* Equipment Maintenance Checklist */}
      <FormSection title="Equipment Maintenance Checklist">
        {isMobile ? (
          // Mobile: Use new mobile checklist system
          <div className="w-full">
            <MobileMaintenanceChecklist
              form={form}
              selectedEquipment={mobileSelectedEquipment}
            />
          </div>
        ) : (
          // Desktop: Keep existing system unchanged
          <div className="w-full">
            <EquipmentTypeFields />
          </div>
        )}
      </FormSection>

      {/* Mobile debugging info */}
      {isMobile && (
        <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg text-sm">
          <strong>📱 MOBILE SYSTEM STATUS:</strong><br />
          Selected Equipment: {mobileSelectedEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Location ID: {locationId || 'None'}<br />
          Mobile State: {mobileSelectedEquipment ? 'ACTIVE' : 'WAITING FOR SELECTION'}<br />
          Timestamp: {new Date().toLocaleString()}
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
