
import React from 'react';
import EquipmentFields from '../EquipmentFields';

interface EquipmentTypeFieldsProps {
  form: any;
  equipmentType: string | null;
}

const EquipmentTypeFields = ({ form, equipmentType }: EquipmentTypeFieldsProps) => {
  if (!equipmentType) {
    return null;
  }

  return (
    <div className="w-full">
      <EquipmentFields 
        form={form} 
        equipmentType={equipmentType}
      />
    </div>
  );
};

export default EquipmentTypeFields;
