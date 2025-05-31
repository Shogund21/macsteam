
import React from 'react';
import { useMaintenanceFormContext } from '../../context/MaintenanceFormContext';
import EquipmentFields from '../EquipmentFields';

const EquipmentTypeFields = () => {
  const { form, equipmentType, selectedEquipment, isMobile } = useMaintenanceFormContext();
  
  const equipmentId = form.watch('equipment_id');

  if (!equipmentId) {
    return null;
  }

  if (!equipmentType) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
        Equipment type not detected. Please try selecting the equipment again.
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <EquipmentFields form={form} equipmentType={equipmentType} />
    </div>
  );
};

export default EquipmentTypeFields;
