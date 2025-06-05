
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

  // Fix mobile scroll issues by ensuring proper viewport
  useEffect(() => {
    if (isMobile) {
      // Ensure mobile viewport is properly set
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
      }
      
      // Enable smooth scrolling on mobile
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [isMobile]);

  return (
    <div 
      className={`w-full space-y-6 ${isMobile ? 'pb-32 min-h-screen' : 'pb-20'}`} 
      data-component="maintenance-form-body"
      style={isMobile ? {
        overflowY: 'auto',
        maxHeight: '100vh',
        WebkitOverflowScrolling: 'touch',
        position: 'relative'
      } : {}}
    >
      {/* Basic Information Section */}
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
            <div>Viewport Height: {window.innerHeight}px</div>
            <div>Scroll Height: {document.documentElement.scrollHeight}px</div>
          </div>
        </div>
      )}
      
      {/* Equipment Maintenance Checklist */}
      {formEquipmentId && (
        <div 
          className={`mobile-checklist-container ${isMobile ? 'mobile-checklist-enhanced' : ''}`}
          data-force-visible="true"
          data-component="equipment-details-wrapper"
          style={isMobile ? {
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            marginTop: '2rem',
            marginBottom: '3rem',
            position: 'relative',
            zIndex: 1
          } : {}}
        >
          <FormSection title="Equipment Maintenance Checklist">
            <div className="w-full">
              <EquipmentTypeFields />
            </div>
          </FormSection>
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
