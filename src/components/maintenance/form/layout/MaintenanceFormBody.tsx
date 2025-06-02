
import React, { useState } from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';
import MobileEquipmentSelector from '../../mobile/MobileEquipmentSelector';
import MobileMaintenanceChecklist from '../../mobile/MobileMaintenanceChecklist';
import { Equipment } from '@/types/maintenance';
import LocationSelect from '../selectors/LocationSelect';
import TechnicianSelect from '../selectors/TechnicianSelect';

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

  // MOBILE VERSION - Completely separate rendering
  if (isMobile) {
    return (
      <div className="w-full space-y-6 pb-20" data-component="mobile-maintenance-form-body">
        {/* Basic Information Section */}
        <FormSection title="Basic Information">
          <div className="space-y-4">
            {/* Location */}
            <div className="w-full">
              <LocationSelect form={form} />
            </div>
            
            {/* Technician */}
            <div className="w-full">
              <TechnicianSelect form={form} technicians={technicians} />
            </div>
            
            {/* Equipment - Mobile Specific */}
            <div className="w-full">
              <MobileEquipmentSelector
                form={form}
                locationId={locationId || ''}
                onEquipmentSelected={handleMobileEquipmentSelected}
              />
            </div>
          </div>
        </FormSection>
        
        {/* Equipment Maintenance Checklist */}
        <FormSection title="Equipment Maintenance Checklist">
          <div className="w-full">
            <MobileMaintenanceChecklist
              form={form}
              selectedEquipment={mobileSelectedEquipment}
            />
          </div>
        </FormSection>

        {/* Mobile debugging info */}
        <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg text-sm">
          <strong>📱 MOBILE SYSTEM STATUS:</strong><br />
          Selected Equipment: {mobileSelectedEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Location ID: {locationId || 'None'}<br />
          Mobile State: {mobileSelectedEquipment ? 'ACTIVE' : 'WAITING FOR SELECTION'}<br />
          Timestamp: {new Date().toLocaleString()}
        </div>

        {/* Documents */}
        <FormSection title="Documents">
          <DocumentManager equipmentId={formEquipmentId} />
        </FormSection>
      </div>
    );
  }

  // DESKTOP VERSION - Original rendering
  return (
    <div className="w-full space-y-4" data-component="desktop-maintenance-form-body">
      <FormSection title="Basic Information">
        <div className="space-y-4">
          <div className="w-full">
            <MaintenanceBasicInfo 
              form={form} 
              equipment={equipment} 
              technicians={technicians} 
            />
          </div>
        </div>
      </FormSection>
      
      {/* Equipment Maintenance Checklist */}
      <FormSection title="Equipment Maintenance Checklist">
        <div className="w-full">
          <EquipmentTypeFields />
        </div>
      </FormSection>

      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
