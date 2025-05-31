
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
  
  // Add logging to track location and equipment changes
  const locationId = form.watch('location_id');
  const equipmentId = form.watch('equipment_id');
  
  console.log('MaintenanceBasicInfo render:', { 
    locationId, 
    equipmentId,
    isMobile,
    values: form.getValues() 
  });

  // CRITICAL FIX: Monitor form values to debug issues with location_id
  useEffect(() => {
    try {
      const subscription = form.watch((value, { name, type }) => {
        if (name === 'location_id') {
          console.log('Location ID changed to:', value.location_id, 'Event type:', type);
          
          // Log complete form state for debugging
          console.log('Form state after location change:', {
            allValues: form.getValues(),
            dirtyFields: form.formState.dirtyFields,
            touchedFields: form.formState.touchedFields,
            errors: form.formState.errors
          });
        }
        
        if (name === 'equipment_id') {
          console.log('Equipment ID changed to:', value.equipment_id, 'Event type:', type);
          
          // CRITICAL FIX: Check if location_id is still intact after equipment selection
          console.log('Current location_id after equipment change:', form.getValues('location_id'));
        }
      });
      
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error in form watch subscription:', error);
    }
  }, [form]);

  return (
    <div className={`space-y-6 ${isMobile ? 'mobile-form-grid' : ''}`}>
      {/* Make sure we pass the form to the LocationSelect component */}
      <div className={isMobile ? 'mobile-form-field' : ''}>
        <LocationSelect form={form} />
      </div>
      
      {/* Only pass the locationId to EquipmentSelect if it exists */}
      <div className={isMobile ? 'mobile-form-field' : ''}>
        <EquipmentSelect form={form} locationId={locationId || ''} />
      </div>
      
      <div className={isMobile ? 'mobile-form-field' : ''}>
        <TechnicianSelect form={form} technicians={technicians} />
      </div>
    </div>
  );
};

export default MaintenanceBasicInfo;
