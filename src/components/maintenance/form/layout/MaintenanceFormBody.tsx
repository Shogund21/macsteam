
import React from 'react';
import FormSection from '../FormSection';
import MaintenanceBasicInfo from '../MaintenanceBasicInfo';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import DocumentManager from '../../documents/DocumentManager';
import EquipmentTypeFields from './EquipmentTypeFields';

const MaintenanceFormBody = () => {
  const { form, equipment, technicians, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  console.log('MaintenanceFormBody render:', { 
    equipmentId, 
    selectedEquipment: selectedEquipment?.name,
    isMobile,
    shouldShowChecklist: !!equipmentId
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
      
      {/* Equipment checklist section with enhanced mobile debugging */}
      {equipmentId && (
        <FormSection title="Equipment Maintenance Checklist">
          <div 
            className="w-full" 
            data-component="equipment-details-wrapper"
            style={{
              backgroundColor: isMobile ? '#f0f9ff' : 'transparent',
              border: isMobile ? '2px solid #3b82f6' : 'none',
              padding: isMobile ? '16px' : '0',
              borderRadius: isMobile ? '8px' : '0',
              minHeight: isMobile ? '200px' : 'auto'
            }}
          >
            {isMobile && (
              <div 
                className="mb-4 p-2 bg-blue-100 border border-blue-300 rounded text-sm"
                style={{ 
                  display: 'block',
                  visibility: 'visible',
                  zIndex: 9999
                }}
              >
                🔧 DEBUG: Equipment Selected - {selectedEquipment?.name || equipmentId}
              </div>
            )}
            <EquipmentTypeFields />
          </div>
        </FormSection>
      )}

      <FormSection title="Documents">
        <DocumentManager equipmentId={equipmentId} />
      </FormSection>
    </div>
  );
};

export default MaintenanceFormBody;
