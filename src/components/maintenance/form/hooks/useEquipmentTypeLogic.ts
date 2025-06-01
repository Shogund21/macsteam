
import { Equipment } from "@/types/maintenance";
import { useState, useEffect } from "react";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | undefined>(undefined);
  const [equipmentType, setEquipmentType] = useState<string | null>(null);
  
  const equipmentId = form.watch('equipment_id');
  
  console.log('useEquipmentTypeLogic: 🔍 EQUIPMENT ANALYSIS:', {
    equipmentId,
    equipmentArrayLength: equipment?.length || 0,
    equipmentIds: equipment?.map(eq => ({ id: eq.id, name: eq.name })) || [],
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    timestamp: new Date().toISOString()
  });

  // CRITICAL: Force immediate equipment update when equipmentId changes
  useEffect(() => {
    console.log('useEquipmentTypeLogic: 🔄 EQUIPMENT ID CHANGED:', {
      newEquipmentId: equipmentId,
      equipmentArrayLength: equipment?.length,
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });

    if (equipmentId && equipment && equipment.length > 0) {
      const currentEquipment = equipment.find(eq => eq.id === equipmentId);
      
      console.log('useEquipmentTypeLogic: 📋 EQUIPMENT LOOKUP RESULT:', {
        equipmentId,
        foundEquipment: currentEquipment?.name,
        equipmentType: currentEquipment ? getEquipmentType(currentEquipment) : null,
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      
      if (currentEquipment) {
        setSelectedEquipment(currentEquipment);
        const detectedType = getEquipmentType(currentEquipment);
        setEquipmentType(detectedType);
        
        console.log('useEquipmentTypeLogic: ✅ EQUIPMENT CONTEXT UPDATED:', {
          equipmentName: currentEquipment.name,
          equipmentId: currentEquipment.id,
          detectedType,
          isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
        });
      } else {
        console.log('useEquipmentTypeLogic: ❌ Equipment not found in array');
      }
    } else {
      console.log('useEquipmentTypeLogic: 🔄 Clearing equipment - no ID or empty array');
      setSelectedEquipment(undefined);
      setEquipmentType(null);
    }
  }, [equipmentId, equipment]);

  const getEquipmentType = (equipment: Equipment): string => {
    if (!equipment) return 'general';
    
    const name = equipment.name.toLowerCase();
    console.log('useEquipmentTypeLogic: 🔍 EQUIPMENT TYPE DETECTION:', {
      originalName: equipment.name,
      lowerCaseName: name,
      equipmentId: equipment.id,
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    
    // Enhanced detection patterns with detailed logging
    const ahuPatterns = ['ahu', 'air handler', 'air handling', 'air-handler', 'airhandler', 'ahu-', 'ahu ', 'ah-', 'ah ', 'rtu', 'roof top unit', 'rooftop unit', 'roof-top', 'rtu-', 'rtu '];
    const chillerPatterns = ['chiller', 'ch-', 'ch ', 'cooling unit', 'chiller-', 'chill'];
    const coolingTowerPatterns = ['cooling tower', 'cooling-tower', 'coolingtower', 'ct-', 'ct ', 'tower'];
    const elevatorPatterns = ['elevator', 'lift', 'elev', 'ele-', 'elevator-'];
    const restroomPatterns = ['restroom', 'bathroom', 'washroom', 'toilet', 'rest-', 'rr-'];
    
    if (ahuPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED AHU/RTU:', equipment.name);
      return 'ahu';
    }
    if (chillerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED CHILLER:', equipment.name);
      return 'chiller';
    }
    if (coolingTowerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED COOLING TOWER:', equipment.name);
      return 'cooling_tower';
    }
    if (elevatorPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED ELEVATOR:', equipment.name);
      return 'elevator';
    }
    if (restroomPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED RESTROOM:', equipment.name);
      return 'restroom';
    }
    
    console.log('useEquipmentTypeLogic: ℹ️ DEFAULTING TO GENERAL:', equipment.name);
    return 'general';
  };

  console.log('useEquipmentTypeLogic: 🎯 HOOK RETURN VALUES:', {
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    detectedEquipmentType: equipmentType,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    timestamp: new Date().toISOString()
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
