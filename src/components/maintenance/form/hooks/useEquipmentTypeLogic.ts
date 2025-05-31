
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) {
      console.log('No selected equipment found');
      return null;
    }
    
    const name = selectedEquipment.name.toLowerCase();
    console.log('Detecting equipment type for:', name);
    
    if (name.includes('ahu') || name.includes('air handler') || name.includes('air handling')) {
      console.log('Detected AHU equipment');
      return 'ahu';
    }
    if (name.includes('chiller')) {
      console.log('Detected chiller equipment');
      return 'chiller';
    }
    if (name.includes('cooling tower')) {
      console.log('Detected cooling tower equipment');
      return 'cooling_tower';
    }
    if (name.includes('elevator')) {
      console.log('Detected elevator equipment');
      return 'elevator';
    }
    if (name.includes('restroom')) {
      console.log('Detected restroom equipment');
      return 'restroom';
    }
    
    console.log('Using general equipment type for:', name);
    return 'general';
  };

  const equipmentType = getEquipmentType();
  
  console.log('useEquipmentTypeLogic result:', {
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    equipmentType
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
