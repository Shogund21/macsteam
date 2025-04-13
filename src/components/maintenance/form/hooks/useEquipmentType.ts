
import { useCallback } from "react";
import { Equipment } from "@/types/maintenance";
import { detectEquipmentType as detectType } from "./utils/equipmentTypeDetection";

/**
 * Hook for determining equipment type based on selected equipment
 */
export const useEquipmentType = () => {
  const detectEquipmentType = useCallback((selectedEquipment: Equipment | undefined): string | null => {
    if (!selectedEquipment) return null;
    return detectType(selectedEquipment.name);
  }, []);

  return { detectEquipmentType };
};

export default useEquipmentType;
