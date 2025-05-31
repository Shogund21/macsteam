
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";
import LocationSelect from "./selectors/LocationSelect";
import EquipmentSelect from "./selectors/EquipmentSelect";
import TechnicianSelect from "./selectors/TechnicianSelect";
import { useIsMobile } from "@/hooks/use-mobile";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  const isMobile = useIsMobile();
  const locationId = form.watch('location_id');

  return (
    <div className={`${isMobile ? 'space-y-4' : 'space-y-6'} w-full`}>
      <LocationSelect form={form} />
      <EquipmentSelect form={form} locationId={locationId || ''} />
      <TechnicianSelect form={form} technicians={technicians} />
    </div>
  );
};

export default MaintenanceBasicInfo;
