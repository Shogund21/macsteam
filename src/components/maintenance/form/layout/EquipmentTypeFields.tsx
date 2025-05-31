
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  console.log('EquipmentTypeFields render:', { equipmentId, equipmentType, isMobile });

  if (!equipmentId) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
        Please select equipment to display the maintenance checklist.
      </div>
    );
  }

  if (!equipmentType) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
        Equipment type not detected. Please try selecting the equipment again.
      </div>
    );
  }
  
  return (
    <div className="w-full space-y-4">
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
        Equipment Type: <strong>{equipmentType}</strong> | Device: <strong>{isMobile ? 'Mobile' : 'Desktop'}</strong>
      </div>
      <EquipmentFields form={form} equipmentType={equipmentType} />
    </div>
  );
};

export default EquipmentTypeFields;
