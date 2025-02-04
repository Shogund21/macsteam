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
  return (
    <div className="space-y-6">
      <EquipmentSelect form={form} locationId={form.watch('location_id')} />
      <LocationSelect form={form} />
      <TechnicianSelect form={form} technicians={technicians} />
    </div>
  );
};

export default MaintenanceBasicInfo;