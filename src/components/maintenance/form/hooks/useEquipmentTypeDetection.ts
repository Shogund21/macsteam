
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeDetection = (selectedEquipment: Equipment | undefined) => {
  if (!selectedEquipment) return null;
  
  const name = selectedEquipment.name.toLowerCase().trim();
  
  // Use more robust detection with includes() for reliability
  if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
  if (name.includes('elevator')) return 'elevator';
  if (name.includes('restroom')) return 'restroom';
  if (name.includes('chiller')) return 'chiller';
  if (name.includes('cooling tower')) return 'cooling_tower';
  
  // Default to general if no specific type is detected
  return 'general';
};

export default useEquipmentTypeDetection;
