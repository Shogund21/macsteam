
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipment, isMobile } = useMaintenanceFormContext();

  // Get form values directly
  const formEquipmentId = form.watch('equipment_id');
  const currentEquipment = formEquipmentId ? equipment.find(eq => eq.id === formEquipmentId) : null;
  
  console.log('🔧 EquipmentTypeFields render:', { 
    formEquipmentId,
    currentEquipmentName: currentEquipment?.name || 'None',
    equipmentCount: equipment?.length || 0,
    isMobile,
    timestamp: new Date().toISOString()
  });

  // Always render the container - show different content based on selection
  if (!formEquipmentId || !currentEquipment) {
    return (
      <div 
        className="w-full p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300" 
        data-component="equipment-type-fields"
        data-equipment-type="none"
      >
        {isMobile && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-sm">
            <strong>📋 Mobile Checklist Status:</strong><br />
            Waiting for equipment selection<br />
            Available equipment: {equipment?.length || 0} items
          </div>
        )}
        
        <div className="text-center py-8 text-gray-500">
          <div className="mb-3">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Select Equipment Above</p>
          <p className="text-sm">Choose a location and equipment to display the maintenance checklist</p>
        </div>
      </div>
    );
  }
  
  // Detect equipment type from name
  const detectEquipmentType = (equipmentName: string): string => {
    const name = equipmentName.toLowerCase();
    
    if (name.includes('ahu') || name.includes('air handler') || name.includes('rtu') || name.includes('rooftop')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower') || name.includes('tower')) return 'cooling_tower';
    if (name.includes('elevator') || name.includes('lift')) return 'elevator';
    if (name.includes('restroom') || name.includes('bathroom')) return 'restroom';
    
    return 'general';
  };
  
  const currentEquipmentType = detectEquipmentType(currentEquipment.name);

  console.log('🔧 EquipmentTypeFields showing checklist:', { 
    equipmentName: currentEquipment.name,
    detectedType: currentEquipmentType,
    isMobile
  });

  return (
    <div 
      className={`w-full ${isMobile ? 'space-y-4' : 'space-y-6'}`}
      data-component="equipment-type-fields"
      data-equipment-type={currentEquipmentType}
      data-equipment-name={currentEquipment.name}
    >
      {isMobile && (
        <div className="p-3 bg-green-100 border border-green-400 rounded text-sm">
          <strong>✅ Mobile Checklist Active:</strong><br />
          Equipment: {currentEquipment.name}<br />
          Type: {currentEquipmentType}<br />
          Status: Displaying maintenance fields
        </div>
      )}
      
      <div className={`${isMobile ? 'bg-white p-4 rounded-lg shadow-sm' : ''}`}>
        <EquipmentFields 
          form={form} 
          equipmentType={currentEquipmentType}
        />
      </div>
    </div>
  );
};

export default EquipmentTypeFields;
