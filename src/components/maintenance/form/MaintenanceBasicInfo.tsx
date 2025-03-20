
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";
import LocationSelect from "./selectors/LocationSelect";
import EquipmentSelect from "./selectors/EquipmentSelect";
import TechnicianSelect from "./selectors/TechnicianSelect";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  // Add logging to track location and equipment changes
  const locationId = form.watch('location_id');
  const equipmentId = form.watch('equipment_id');
  
  console.log('MaintenanceBasicInfo render:', { locationId, equipmentId });

  return (
    <div className="space-y-6">
      <LocationSelect form={form} />
      <EquipmentSelect form={form} locationId={locationId} />
      <TechnicianSelect form={form} technicians={technicians} />
    </div>
  );
};

export default MaintenanceBasicInfo;
