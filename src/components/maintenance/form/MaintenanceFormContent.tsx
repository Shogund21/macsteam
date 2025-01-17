import { UseFormReturn } from "react-hook-form";
import MaintenanceBasicInfo from "./MaintenanceBasicInfo";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import CoolingTowerMaintenanceFields from "./CoolingTowerMaintenanceFields";
import DocumentManager from "../documents/DocumentManager";
import { Equipment, Technician } from "@/types/maintenance";

interface MaintenanceFormContentProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
  isAHU: boolean;
  isCoolingTower: boolean;
}

const MaintenanceFormContent = ({
  form,
  equipment,
  technicians,
  isAHU,
  isCoolingTower,
}: MaintenanceFormContentProps) => {
  return (
    <>
      <MaintenanceBasicInfo 
        form={form} 
        equipment={equipment} 
        technicians={technicians} 
      />
      
      {isAHU ? (
        <AHUMaintenanceFields form={form} />
      ) : isCoolingTower ? (
        <CoolingTowerMaintenanceFields form={form} />
      ) : (
        <>
          <MaintenanceReadings form={form} />
          <MaintenanceStatus form={form} />
          <MaintenanceObservations form={form} />
        </>
      )}

      <DocumentManager equipmentId={form.watch('equipment_id')} />
    </>
  );
};

export default MaintenanceFormContent;