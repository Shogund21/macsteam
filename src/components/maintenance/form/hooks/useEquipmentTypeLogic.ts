
import { Equipment } from "@/types/maintenance";
import { useState, useEffect } from "react";

export const useEquipmentTypeLogic = (equipment: Equipment[], form: any) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | undefined>(undefined);
  const [equipmentType, setEquipmentType] = useState<string | null>(null);
  
  const equipmentId = form.watch('equipment_id');
  
  console.log('useEquipmentTypeLogic: 🔍 DIRECT LOOKUP STRATEGY:', {
    equipmentId,
    equipmentArrayLength: equipment?.length || 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    timestamp: new Date().toISOString()
  });

  // CRITICAL: Immediate and reliable equipment detection
  useEffect(() => {
    if (equipmentId && equipment && equipment.length > 0) {
      const foundEquipment = equipment.find(eq => eq.id === equipmentId);
      
      if (foundEquipment) {
        setSelectedEquipment(foundEquipment);
        const detectedType = getEquipmentType(foundEquipment);
        setEquipmentType(detectedType);
        
        console.log('useEquipmentTypeLogic: ✅ EQUIPMENT SET:', {
          equipmentName: foundEquipment.name,
          equipmentId: foundEquipment.id,
          detectedType,
          rawName: foundEquipment.name.toLowerCase(),
          isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
        });
      } else {
        console.log('useEquipmentTypeLogic: ❌ Equipment not found for ID:', equipmentId);
        setSelectedEquipment(undefined);
        setEquipmentType('general'); // Always fallback to general
      }
    } else {
      console.log('useEquipmentTypeLogic: 🔄 No equipment ID or empty array');
      setSelectedEquipment(undefined);
      setEquipmentType(null);
    }
  }, [equipmentId, equipment]);

  // STANDARDIZED: Equipment type detection that returns consistent values
  const getEquipmentType = (equipment: Equipment): string => {
    if (!equipment) {
      console.log('getEquipmentType: No equipment provided, returning general');
      return 'general';
    }
    
    const name = equipment.name.toLowerCase();
    console.log('getEquipmentType: Analyzing equipment name:', name);
    
    // Return standardized equipment types that match the switch cases exactly
    if (name.includes('ahu') || name.includes('air handler') || name.includes('air-handler') || 
        name.includes('rtu') || name.includes('rooftop') || name.includes('roof-top')) {
      console.log('getEquipmentType: Detected AHU');
      return 'ahu';
    }
    if (name.includes('chiller') || name.includes('ch-') || name.includes('cooling unit')) {
      console.log('getEquipmentType: Detected Chiller');
      return 'chiller';
    }
    if (name.includes('cooling tower') || name.includes('tower') || name.includes('ct-')) {
      console.log('getEquipmentType: Detected Cooling Tower');
      return 'coolingtower'; // FIXED: Return normalized version to match switch case
    }
    if (name.includes('elevator') || name.includes('lift') || name.includes('elev')) {
      console.log('getEquipmentType: Detected Elevator');
      return 'elevator';
    }
    if (name.includes('restroom') || name.includes('bathroom') || name.includes('washroom')) {
      console.log('getEquipmentType: Detected Restroom');
      return 'restroom';
    }
    
    console.log('getEquipmentType: No specific type detected, returning general');
    return 'general';
  };

  return {
    selectedEquipment,
    equipmentType
  };
};
