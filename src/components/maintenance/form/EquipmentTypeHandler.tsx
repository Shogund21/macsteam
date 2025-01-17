import { Equipment } from "@/types/maintenance";
import { UseFormWatch } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";

interface EquipmentTypeHandlerProps {
  equipment: Equipment[];
  watch: UseFormWatch<MaintenanceFormValues>;
  children: (params: {
    isAHU: boolean;
    isCoolingTower: boolean;
    selectedEquipment: Equipment | undefined;
  }) => React.ReactNode;
}

const EquipmentTypeHandler = ({ equipment, watch, children }: EquipmentTypeHandlerProps) => {
  const selectedEquipment = equipment?.find(
    (eq) => eq.id === watch('equipment_id')
  );
  
  const isAHU = selectedEquipment?.name.toLowerCase().includes('ahu');
  const isCoolingTower = selectedEquipment?.name.toLowerCase().includes('cooling tower');
  
  console.log('Selected equipment:', selectedEquipment);
  console.log('Equipment type:', { isAHU, isCoolingTower });

  return <>{children({ isAHU, isCoolingTower, selectedEquipment })}</>;
};

export default EquipmentTypeHandler;