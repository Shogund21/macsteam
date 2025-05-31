
import { Equipment } from "@/types/maintenance";
import { useEffect } from "react";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const equipmentId = form.watch('equipment_id');
  
  // MOBILE DEBUG: Enhanced input analysis
  useEffect(() => {
    console.log('useEquipmentTypeLogic: 🔍 MOBILE DEBUG - State Change Detected:', {
      equipmentId,
      equipmentArrayLength: equipment?.length || 0,
      equipmentIds: equipment?.map(eq => ({ id: eq.id, name: eq.name })) || [],
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
      timestamp: new Date().toISOString(),
      formState: form.getValues()
    });
  }, [equipmentId, equipment, form]);

  const selectedEquipment = equipment?.find(
    (eq) => eq.id === equipmentId
  );

  const getEquipmentType = () => {
    if (!selectedEquipment || !equipmentId || equipmentId === '') {
      console.log('useEquipmentTypeLogic: ❌ MOBILE - No selected equipment found:', {
        equipmentId,
        hasSelectedEquipment: !!selectedEquipment,
        equipmentIdEmpty: !equipmentId || equipmentId === ''
      });
      return null;
    }
    
    const name = selectedEquipment.name.toLowerCase();
    console.log('useEquipmentTypeLogic: 🔍 MOBILE EQUIPMENT DETECTION - Starting Analysis:', {
      originalName: selectedEquipment.name,
      lowerCaseName: name,
      equipmentId: selectedEquipment.id,
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    
    // Enhanced AHU detection patterns
    const ahuPatterns = [
      'ahu',
      'air handler',
      'air handling',
      'air-handler',
      'airhandler',
      'ahu-',
      'ahu ',
      'ah-',
      'ah '
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
    if (ahuPatterns.some(pattern => name.includes(pattern)) || /ahu[\s-]?\w*/.test(name)) {
      console.log('useEquipmentTypeLogic: ✅ MOBILE - DETECTED AHU EQUIPMENT:', {
        equipmentName: selectedEquipment.name,
        detectedType: 'ahu',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'ahu';
    }
    
    if (chillerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ MOBILE - DETECTED CHILLER EQUIPMENT:', {
        equipmentName: selectedEquipment.name,
        detectedType: 'chiller',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'chiller';
    }
    
    if (coolingTowerPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ MOBILE - DETECTED COOLING TOWER EQUIPMENT:', {
        equipmentName: selectedEquipment.name,
        detectedType: 'cooling_tower',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'cooling_tower';
    }
    
    if (elevatorPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ MOBILE - DETECTED ELEVATOR EQUIPMENT:', {
        equipmentName: selectedEquipment.name,
        detectedType: 'elevator',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'elevator';
    }
    
    if (restroomPatterns.some(pattern => name.includes(pattern))) {
      console.log('useEquipmentTypeLogic: ✅ MOBILE - DETECTED RESTROOM EQUIPMENT:', {
        equipmentName: selectedEquipment.name,
        detectedType: 'restroom',
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
      });
      return 'restroom';
    }
    
    console.log('useEquipmentTypeLogic: ℹ️ MOBILE - Using general equipment type for:', {
      equipmentName: name,
      detectedType: 'general',
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
    });
    return 'general';
  };

  const equipmentType = getEquipmentType();
  
  // MOBILE ENHANCEMENT: Additional logging for final results
  useEffect(() => {
    if (selectedEquipment && equipmentType) {
      console.log('useEquipmentTypeLogic: 🎯 MOBILE FINAL RESULT - Equipment Type Determined:', {
        selectedEquipmentId: selectedEquipment?.id,
        selectedEquipmentName: selectedEquipment?.name,
        detectedEquipmentType: equipmentType,
        isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
        windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
        shouldTriggerChecklist: !!equipmentType,
        timestamp: new Date().toISOString()
      });
    }
  }, [selectedEquipment, equipmentType]);

  return {
    selectedEquipment,
    equipmentType
  };
};
