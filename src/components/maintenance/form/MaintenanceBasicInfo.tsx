
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";
import LocationSelect from "./selectors/LocationSelect";
import EquipmentSelect from "./selectors/EquipmentSelect";
import TechnicianSelect from "./selectors/TechnicianSelect";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  const isMobile = useIsMobile();
  
  const locationId = form.watch('location_id');
  const equipmentId = form.watch('equipment_id');
  
  console.log('MaintenanceBasicInfo render:', { 
    locationId, 
    equipmentId,
    isMobile,
    values: form.getValues() 
  });

  useEffect(() => {
    try {
      const subscription = form.watch((value, { name, type }) => {
        if (name === 'location_id') {
          console.log('Location ID changed to:', value.location_id, 'Event type:', type);
        }
        
        if (name === 'equipment_id') {
          console.log('Equipment ID changed to:', value.equipment_id, 'Event type:', type);
        }
      });
      
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error in form watch subscription:', error);
    }
  }, [form]);

  return (
    <div 
      className={`${isMobile ? 'space-y-4' : 'space-y-6'} w-full`}
      data-component="maintenance-basic-info"
    >
      <div className="w-full" data-field="location">
        <LocationSelect form={form} />
      </div>
      
      {/* Only show equipment selector on desktop - mobile handles this separately */}
      {!isMobile && (
        <div className="w-full" data-field="equipment">
          <EquipmentSelect form={form} locationId={locationId || ''} />
        </div>
      )}
      
      <div className="w-full" data-field="technician">
        <TechnicianSelect form={form} technicians={technicians} />
      </div>
    </div>
  );
};

export default MaintenanceBasicInfo;
