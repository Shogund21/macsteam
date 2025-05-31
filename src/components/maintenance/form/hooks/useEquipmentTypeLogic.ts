
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const equipmentId = form.watch('equipment_id');
  
  console.log('useEquipmentTypeLogic: 🔍 INPUT DEBUG:', {
    equipmentId,
    equipmentArrayLength: equipment?.length || 0,
    equipmentIds: equipment?.map(eq => ({ id: eq.id, name: eq.name })) || []
  });

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === equipmentId
  );

  const getEquipmentType = () => {
    if (!selectedEquipment) {
      console.log('useEquipmentTypeLogic: ❌ No selected equipment found for ID:', equipmentId);
      return null;
    }
    
    const name = selectedEquipment.name.toLowerCase();
    console.log('useEquipmentTypeLogic: 🔍 ANALYZING EQUIPMENT NAME:', {
      originalName: selectedEquipment.name,
      lowerCaseName: name,
      equipmentId: selectedEquipment.id
    });
    
    // Enhanced AHU detection with more variations and better logging
    const ahuPatterns = [
      name.includes('ahu'),
      name.includes('air handler'),
      name.includes('air handling'),
      name.includes('air-handler'),
      name.includes('airhandler'),
      /ahu[\s-]?\d+/.test(name),
      /air[\s-]?handler[\s-]?\d+/.test(name),
      /ahu[\s-]?\w+/.test(name) // Match "AHU 5", "AHU-A", etc.
    ];
    
    console.log('useEquipmentTypeLogic: 🔍 AHU PATTERN TESTS:', {
      name,
      patterns: {
        includesAhu: name.includes('ahu'),
        includesAirHandler: name.includes('air handler'),
        includesAirHandling: name.includes('air handling'),
        includesAirHandlerHyphen: name.includes('air-handler'),
        includesAirhandler: name.includes('airhandler'),
        ahuWithNumber: /ahu[\s-]?\d+/.test(name),
        airHandlerWithNumber: /air[\s-]?handler[\s-]?\d+/.test(name),
        ahuWithAny: /ahu[\s-]?\w+/.test(name)
      },
      anyMatch: ahuPatterns.some(pattern => pattern)
    });
    
    if (ahuPatterns.some(pattern => pattern)) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED AHU EQUIPMENT:', selectedEquipment.name);
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
    detectedEquipmentType: equipmentType,
    isAhu: equipmentType === 'ahu',
    timestamp: new Date().toISOString()
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
