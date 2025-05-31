
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const selectedEquipment = equipment?.find(
    (eq) => eq.id === form.watch('equipment_id')
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) {
      console.log('useEquipmentTypeLogic: No selected equipment found');
      return null;
    }
    
    const name = selectedEquipment.name.toLowerCase();
    console.log('useEquipmentTypeLogic: Detecting equipment type for:', name);
    console.log('useEquipmentTypeLogic: Equipment object:', selectedEquipment);
    
    // Enhanced AHU detection with more variations
    if (name.includes('ahu') || 
        name.includes('air handler') || 
        name.includes('air handling') ||
        name.includes('air-handler') ||
        name.includes('airhandler') ||
        /ahu[\s-]?\d+/.test(name) ||
        /air[\s-]?handler[\s-]?\d+/.test(name)) {
      console.log('useEquipmentTypeLogic: ✅ Detected AHU equipment');
      return 'ahu';
    }
    if (name.includes('chiller')) {
      console.log('useEquipmentTypeLogic: ✅ Detected chiller equipment');
      return 'chiller';
    }
    if (name.includes('cooling tower') || name.includes('cooling-tower')) {
      console.log('useEquipmentTypeLogic: ✅ Detected cooling tower equipment');
      return 'cooling_tower';
    }
    if (name.includes('elevator')) {
      console.log('useEquipmentTypeLogic: ✅ Detected elevator equipment');
      return 'elevator';
    }
    if (name.includes('restroom')) {
      console.log('useEquipmentTypeLogic: ✅ Detected restroom equipment');
      return 'restroom';
    }
    
    console.log('useEquipmentTypeLogic: ℹ️ Using general equipment type for:', name);
    return 'general';
  };

  const equipmentType = getEquipmentType();
  
  console.log('useEquipmentTypeLogic: 🎯 FINAL RESULT:', {
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    equipmentType,
    timestamp: new Date().toISOString()
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
