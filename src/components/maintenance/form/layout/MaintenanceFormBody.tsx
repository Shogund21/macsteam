
import React, { useState, useEffect } from 'react';
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
  
  // AGGRESSIVE mobile state management
  const [mobileSelectedEquipment, setMobileSelectedEquipment] = useState<Equipment | null>(null);
  const [aggressiveForceUpdate, setAggressiveForceUpdate] = useState(0);
  
  const formEquipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');

  console.log('🔧 MaintenanceFormBody AGGRESSIVE DEBUG:', { 
    isMobile,
    formEquipmentId,
    locationId,
    hasMobileSelection: !!mobileSelectedEquipment,
    mobileEquipmentName: mobileSelectedEquipment?.name || 'None',
    aggressiveForceUpdate,
    timestamp: new Date().toISOString()
  });

  // AGGRESSIVE equipment selection handler
  const handleMobileEquipmentSelected = (selectedEquipment: Equipment | null) => {
    console.log('🔧 AGGRESSIVE Equipment Selected:', {
      equipmentName: selectedEquipment?.name || 'None',
      equipmentId: selectedEquipment?.id || 'None',
      previousEquipment: mobileSelectedEquipment?.name || 'None'
    });
    
    setMobileSelectedEquipment(selectedEquipment);
    setAggressiveForceUpdate(prev => prev + 1);
    
    // AGGRESSIVE: Multiple update strategies
    if (selectedEquipment) {
      // Force form update with multiple validation triggers
      form.setValue('equipment_id', selectedEquipment.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
      
      // Trigger validation again after a short delay
      setTimeout(() => {
        form.trigger('equipment_id');
        console.log('🔧 AGGRESSIVE: Delayed form trigger completed');
      }, 100);
    }
    
    console.log('🔧 AGGRESSIVE: Equipment selection complete, force update:', aggressiveForceUpdate + 1);
  };

  // AGGRESSIVE form sync
  useEffect(() => {
    if (isMobile && formEquipmentId && equipment) {
      const foundEquipment = equipment.find(eq => eq.id === formEquipmentId);
      if (foundEquipment && foundEquipment.id !== mobileSelectedEquipment?.id) {
        console.log('🔧 AGGRESSIVE: Syncing form equipment with mobile state:', foundEquipment.name);
        setMobileSelectedEquipment(foundEquipment);
        setAggressiveForceUpdate(prev => prev + 1);
      }
    }
  }, [formEquipmentId, equipment, isMobile, mobileSelectedEquipment]);

  // MOBILE VERSION - AGGRESSIVE rendering
  if (isMobile) {
    return (
      <div className="w-full space-y-6 pb-20" data-component="mobile-maintenance-form-body-aggressive">
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
            
            {/* Equipment - AGGRESSIVE Mobile Specific */}
            <div className="w-full">
              <MobileEquipmentSelector
                form={form}
                locationId={locationId || ''}
                onEquipmentSelected={handleMobileEquipmentSelected}
              />
            </div>
          </div>
        </FormSection>
        
        {/* Equipment Maintenance Checklist - AGGRESSIVE visibility */}
        <FormSection title="Equipment Maintenance Checklist">
          <div className="w-full">
            {/* AGGRESSIVE visual separator and status indicator */}
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-300">
              <div className="text-sm text-yellow-800 font-medium">
                🚀 AGGRESSIVE CHECKLIST STATUS:<br />
                Selected Equipment: {mobileSelectedEquipment?.name || 'None'}<br />
                Form Equipment ID: {formEquipmentId || 'None'}<br />
                Force Update: {aggressiveForceUpdate}<br />
                Status: {(mobileSelectedEquipment || formEquipmentId) ? '✅ SHOULD BE VISIBLE' : '⏳ WAITING FOR EQUIPMENT'}
              </div>
            </div>
            
            <MobileMaintenanceChecklist
              form={form}
              selectedEquipment={mobileSelectedEquipment}
              key={`aggressive-checklist-${aggressiveForceUpdate}-${mobileSelectedEquipment?.id || formEquipmentId || 'none'}`}
            />
          </div>
        </FormSection>

        {/* AGGRESSIVE mobile debugging info */}
        <div className="bg-purple-100 border-2 border-purple-500 p-4 rounded-lg text-sm">
          <strong>🔥 AGGRESSIVE MOBILE SYSTEM STATUS:</strong><br />
          Selected Equipment: {mobileSelectedEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Location ID: {locationId || 'None'}<br />
          Mobile State: {(mobileSelectedEquipment || formEquipmentId) ? 'ACTIVE' : 'WAITING FOR SELECTION'}<br />
          Aggressive Force Counter: {aggressiveForceUpdate}<br />
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
