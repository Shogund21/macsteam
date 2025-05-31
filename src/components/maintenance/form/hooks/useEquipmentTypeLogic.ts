
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) return null;
    const name = selectedEquipment.name.toLowerCase();
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower')) return 'cooling_tower';
    if (name.includes('elevator')) return 'elevator';
    if (name.includes('restroom')) return 'restroom';
    return 'general';
  };

  const equipmentType = getEquipmentType();

  return {
    selectedEquipment,
    equipmentType
  };
};
