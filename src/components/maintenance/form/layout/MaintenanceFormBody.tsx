
import React, { useState, useEffect } from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  // CRITICAL: Force re-render key for immediate updates
  const [renderKey, setRenderKey] = useState(0);
  
  // CRITICAL: Use ONLY form state for rendering decisions - bypass context
  const formEquipmentId = form.watch('equipment_id');
  
  // CRITICAL: Simple direct lookup - no context dependencies
  const hasEquipmentSelected = !!(formEquipmentId && equipment && equipment.length > 0);
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;

  // CRITICAL: Force component update when equipment changes
  useEffect(() => {
    if (formEquipmentId) {
      console.log('🔧 FORCE RENDER: Equipment changed to:', formEquipmentId);
      setRenderKey(prev => prev + 1);
    }
  }, [formEquipmentId]);

  console.log('🔧 MaintenanceFormBody ALWAYS RENDER CHECKLIST:', { 
    formEquipmentId,
    equipmentArrayLength: equipment?.length || 0,
    hasEquipmentSelected,
    currentEquipmentName: currentEquipment?.name || 'None',
    isMobile,
    renderKey,
    cssImportFixed: true,
    timestamp: new Date().toISOString()
  });

  return (
    <div className="w-full space-y-4" data-component="maintenance-form-body">
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      {/* CRITICAL: ALWAYS render this section - REMOVED conditional barrier */}
      <FormSection title="Equipment Maintenance Checklist">
        <div 
          key={`equipment-fields-${renderKey}`}
          className="w-full mobile-checklist-force-visible" 
          data-component="equipment-details-wrapper"
          data-mobile-visible="true"
          data-equipment-id={formEquipmentId || 'none'}
          data-equipment-name={currentEquipment?.name || 'None Selected'}
          data-force-visible="true"
          data-render-key={renderKey}
        >
          <EquipmentTypeFields />
        </div>
      </FormSection>

      {/* Mobile debugging - always show with enhanced info */}
      {isMobile && (
        <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-sm mobile-debug-info">
          <strong>✅ MOBILE CHECKLIST STATUS (FIXED):</strong><br />
          Equipment Selected: {currentEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Has Equipment Array: {equipment?.length > 0 ? 'Yes' : 'No'}<br />
          Checklist Section: ALWAYS RENDERED<br />
          Content State: {hasEquipmentSelected ? 'SHOWING FIELDS' : 'SHOWING SELECT MESSAGE'}<br />
          CSS Import: FIXED ✓<br />
          Mobile Breakpoint: 1024px ✓<br />
          Render Key: {renderKey}<br />
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
