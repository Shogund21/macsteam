
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
      
      {/* Mobile Debug Information */}
      {isMobile && (
        <div className="mobile-debug-info p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
          <h4 className="font-semibold text-yellow-800">Mobile Debug Status:</h4>
          <div className="text-sm text-yellow-700 mt-2">
            <div>Selected Equipment ID: {formEquipmentId || 'None'}</div>
            <div>Location ID: {locationId || 'None'}</div>
            <div>Equipment Count: {equipment?.length || 0}</div>
            <div>Should Show Checklist: {formEquipmentId ? 'YES' : 'NO'}</div>
            <div>Is Mobile: {isMobile ? 'YES' : 'NO'}</div>
          </div>
        </div>
      )}
      
      {/* Equipment Maintenance Checklist - Force render on mobile with enhanced visibility */}
      {formEquipmentId && (
        <div 
          className={`mobile-checklist-force-visible ${isMobile ? 'mobile-checklist-force-visible' : ''}`}
          data-force-visible="true"
          data-component="equipment-details-wrapper"
        >
          <FormSection title="Equipment Maintenance Checklist">
            <div className="w-full">
              <EquipmentTypeFields />
            </div>
          </FormSection>
        </div>
      )}

      {/* FALLBACK: Always show checklist section on mobile if equipment exists */}
      {isMobile && formEquipmentId && (
        <div 
          className="mobile-checklist-force-visible bg-green-50 border-2 border-green-500 p-4 rounded-lg"
          data-force-visible="true"
          style={{ display: 'block !important', visibility: 'visible !important', opacity: '1 !important' }}
        >
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            🔧 Mobile Maintenance Checklist (Fallback)
          </h3>
          <div className="text-green-700 text-sm mb-4">
            This section should always be visible when equipment is selected on mobile.
          </div>
          <EquipmentTypeFields />
        </div>
      )}

      {/* Documents */}
      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
