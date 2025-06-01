
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

  // CRITICAL: Use useEffect to ensure proper re-renders when equipment changes
  useEffect(() => {
    const currentEquipment = equipment?.find(eq => eq.id === equipmentId);
    
    console.log('useEquipmentTypeLogic: 🔄 EQUIPMENT UPDATE EFFECT:', {
      equipmentId,
      foundEquipment: currentEquipment?.name,
      equipmentArrayLength: equipment?.length,
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    
    setSelectedEquipment(currentEquipment);
    
    if (currentEquipment) {
      const detectedType = getEquipmentType(currentEquipment);
      setEquipmentType(detectedType);
      
      console.log('useEquipmentTypeLogic: ✅ EQUIPMENT TYPE DETECTED:', {
        equipmentName: currentEquipment.name,
        detectedType,
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
    } else {
      setEquipmentType(null);
      console.log('useEquipmentTypeLogic: ❌ No equipment found for ID:', equipmentId);
    }
  }, [equipmentId, equipment]);

  const getEquipmentType = (equipment: Equipment): string => {
    if (!equipment) return 'general';
    
    const name = equipment.name.toLowerCase();
    console.log('useEquipmentTypeLogic: 🔍 EQUIPMENT DETECTION:', {
      originalName: equipment.name,
      lowerCaseName: name,
      equipmentId: equipment.id,
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    
    // Enhanced AHU detection patterns - INCLUDES RTU
    const ahuPatterns = [
      'ahu',
      'air handler',
      'air handling',
      'air-handler',
      'airhandler',
      'ahu-',
      'ahu ',
      'ah-',
      'ah ',
      'rtu',              // Added RTU detection
      'roof top unit',    // Added roof top unit
      'rooftop unit',     // Added rooftop unit variant
      'roof-top',         // Added hyphenated variant
      'rtu-',             // Added RTU with dash
      'rtu '              // Added RTU with space
    ];
    
    // Enhanced chiller detection patterns  
    const chillerPatterns = [
      'chiller',
      'ch-',
      'ch ',
      'cooling unit',
      'chiller-',
      'chill'
    ];
    
    // Enhanced cooling tower detection patterns
    const coolingTowerPatterns = [
      'cooling tower',
      'cooling-tower',
      'coolingtower',
      'ct-',
      'ct ',
      'tower'
    ];
    
    // Enhanced elevator detection patterns
    const elevatorPatterns = [
      'elevator',
      'lift',
      'elev',
      'ele-',
      'elevator-'
    ];
    
    // Enhanced restroom detection patterns
    const restroomPatterns = [
      'restroom',
      'bathroom',
      'washroom',
      'toilet',
      'rest-',
      'rr-'
    ];
    
    // Check each equipment type with detailed logging
    if (ahuPatterns.some(pattern => name.includes(pattern)) || /ahu[\s-]?\w*/.test(name) || /rtu[\s-]?\w*/.test(name)) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED AHU/RTU EQUIPMENT:', {
        equipmentName: equipment.name,
        detectedType: 'ahu',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'ahu';
    }
    
    if (chillerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED CHILLER EQUIPMENT:', {
        equipmentName: equipment.name,
        detectedType: 'chiller',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'chiller';
    }
    
    if (coolingTowerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED COOLING TOWER EQUIPMENT:', {
        equipmentName: equipment.name,
        detectedType: 'cooling_tower',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'cooling_tower';
    }
    
    if (elevatorPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED ELEVATOR EQUIPMENT:', {
        equipmentName: equipment.name,
        detectedType: 'elevator',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'elevator';
    }
    
    if (restroomPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ DETECTED RESTROOM EQUIPMENT:', {
        equipmentName: equipment.name,
        detectedType: 'restroom',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'restroom';
    }
    
    console.log('useEquipmentTypeLogic: ℹ️ Using general equipment type for:', {
      equipmentName: name,
      detectedType: 'general',
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    return 'general';
  };

  console.log('useEquipmentTypeLogic: 🎯 FINAL RESULT:', {
    selectedEquipmentId: selectedEquipment?.id,
    selectedEquipmentName: selectedEquipment?.name,
    detectedEquipmentType: equipmentType,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
    timestamp: new Date().toISOString()
  });

  return {
    selectedEquipment,
    equipmentType
  };
};
