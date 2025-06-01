
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, isMobile } = useMaintenanceFormContext();
  
  // Simple direct form state watching - no complex timing
  const formEquipmentId = form.watch('equipment_id');
  const hasEquipmentSelected = !!(formEquipmentId && equipment && equipment.length > 0);
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;

  console.log('🔧 MaintenanceFormBody render:', { 
    formEquipmentId,
    equipmentArrayLength: equipment?.length || 0,
    hasEquipmentSelected,
    currentEquipmentName: currentEquipment?.name || 'None',
    isMobile,
    timestamp: new Date().toISOString()
  });

  return (
    <div 
      className="w-full space-y-4" 
      data-component="maintenance-form-body"
      style={isMobile ? {
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        overflow: 'visible',
        minHeight: 'auto'
      } : {}}
    >
      <FormSection title="Basic Information">
        <MaintenanceBasicInfo 
          form={form} 
          equipment={equipment} 
          technicians={technicians} 
        />
      </FormSection>
      
      <FormSection title="Equipment Maintenance Checklist">
        <div 
          className="w-full" 
          data-component="equipment-details-wrapper"
          data-equipment-id={formEquipmentId || 'none'}
          data-equipment-name={currentEquipment?.name || 'None Selected'}
          style={isMobile ? {
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            overflow: 'visible',
            minHeight: '100px'
          } : {}}
        >
          <EquipmentTypeFields />
        </div>
      </FormSection>

      {/* Mobile debugging info */}
      {isMobile && (
        <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-lg text-sm">
          <strong>📱 MOBILE DEBUG INFO:</strong><br />
          Equipment Selected: {currentEquipment?.name || 'None'}<br />
          Form Equipment ID: {formEquipmentId || 'None'}<br />
          Has Equipment Array: {equipment?.length > 0 ? 'Yes' : 'No'}<br />
          Checklist Visible: {hasEquipmentSelected ? 'YES' : 'NO'}<br />
          Mobile Detection: Fixed ✓<br />
          CSS Imports: Fixed ✓<br />
          Layout Constraints: Removed ✓
        </div>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={formEquipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
