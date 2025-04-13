
import { useCallback } from "react";
import { Equipment } from "@/types/maintenance";

/**
 * Hook for determining equipment type based on selected equipment
 */
export const useEquipmentType = () => {
  const detectEquipmentType = useCallback((selectedEquipment: Equipment | undefined): string | null => {
    if (!selectedEquipment) return null;
    
    const name = selectedEquipment.name.toLowerCase();
    if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
    if (name.includes('chiller')) return 'chiller';
    if (name.includes('cooling tower')) return 'cooling_tower';
    if (name.includes('elevator')) return 'elevator';
    if (name.includes('restroom')) return 'restroom';
    return 'general';
  }, []);

  return { detectEquipmentType };
};

export default useEquipmentType;
