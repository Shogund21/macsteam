
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
    
    // Enhanced detection patterns
    const ahuPatterns = [
      'ahu',
      'air handler',
      'air handling',
      'air-handler',
      'airhandler'
    ];
    
    const chillerPatterns = [
      'chiller',
      'ch-',
      'ch ',
      'cooling unit'
    ];
    
    const coolingTowerPatterns = [
      'cooling tower',
      'cooling-tower',
      'coolingtower',
      'ct-',
      'ct '
    ];
    
    const elevatorPatterns = [
      'elevator',
      'lift',
      'elev'
    ];
    
    const restroomPatterns = [
      'restroom',
      'bathroom',
      'washroom',
      'toilet'
    ];
    
    // Check each equipment type
    if (ahuPatterns.some(pattern => name.includes(pattern)) || /ahu[\s-]?\w*/.test(name)) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED AHU EQUIPMENT:', selectedEquipment.name);
      return 'ahu';
    }
    
    if (chillerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED CHILLER EQUIPMENT:', selectedEquipment.name);
      return 'chiller';
    }
    
    if (coolingTowerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED COOLING TOWER EQUIPMENT:', selectedEquipment.name);
      return 'cooling_tower';
    }
    
    if (elevatorPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED ELEVATOR EQUIPMENT:', selectedEquipment.name);
      return 'elevator';
    }
    
    if (restroomPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED RESTROOM EQUIPMENT:', selectedEquipment.name);
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
    timestamp: new Date().toISOString()
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
