
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

  const getEquipmentType = (equipment: Equipment): string => {
    if (!equipment) return 'general';
    
    const name = equipment.name.toLowerCase();
    
    // Enhanced detection with standardized return values that match the switch statement
    if (name.includes('ahu') || name.includes('air handler') || name.includes('air-handler') || 
        name.includes('rtu') || name.includes('rooftop') || name.includes('roof-top')) {
      return 'ahu';
    }
    if (name.includes('chiller') || name.includes('ch-') || name.includes('cooling unit')) {
      return 'chiller';
    }
    if (name.includes('cooling tower') || name.includes('tower') || name.includes('ct-')) {
      return 'cooling tower'; // Match the switch case exactly
    }
    if (name.includes('elevator') || name.includes('lift') || name.includes('elev')) {
      return 'elevator';
    }
    if (name.includes('restroom') || name.includes('bathroom') || name.includes('washroom')) {
      return 'restroom';
    }
    
    return 'general';
  };

  return {
    selectedEquipment,
    equipmentType
  };
};
