
import { Equipment } from "@/types/maintenance";

export const useEquipmentTypeDetection = (selectedEquipment: Equipment | undefined) => {
  if (!selectedEquipment) return null;
  
  const name = selectedEquipment.name.toLowerCase();
  if (name.includes('ahu') || name.includes('air handler')) return 'ahu';
  if (name.includes('elevator')) return 'elevator';
  if (name.includes('restroom')) return 'restroom';
  return 'general';
};

export default useEquipmentTypeDetection;
