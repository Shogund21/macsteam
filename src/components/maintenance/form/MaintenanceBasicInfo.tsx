
import { UseFormReturn } from "react-hook-form";
import { Equipment, Technician } from "@/types/maintenance";
import LocationSelect from "./selectors/LocationSelect";
import EquipmentSelect from "./selectors/EquipmentSelect";
import TechnicianSelect from "./selectors/TechnicianSelect";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface MaintenanceBasicInfoProps {
  form: UseFormReturn<any>;
  equipment: Equipment[];
  technicians: Technician[];
}

const MaintenanceBasicInfo = ({ form, equipment, technicians }: MaintenanceBasicInfoProps) => {
  // Add logging to track location and equipment changes
  const locationId = form.watch('location_id');
  const equipmentId = form.watch('equipment_id');
  
  console.log('MaintenanceBasicInfo render:', { 
    locationId, 
    equipmentId,
    values: form.getValues() 
  });

  // Monitor location changes to debug issues
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
          
          // If location changed but no value is present, show warning
          if (!value.location_id) {
            console.warn('Location ID was cleared or set to empty value');
          }
          
          // Verify the selected location exists in the database
          const locationExists = equipment.some(eq => eq.location_id === value.location_id);
          if (!locationExists && value.location_id) {
            console.warn('Selected location ID may not exist in database:', value.location_id);
            toast({
              title: "Warning",
              description: "The selected location ID may not be valid",
              variant: "destructive",
            });
          }
        }
        
        if (name === 'equipment_id') {
          console.log('Equipment ID changed to:', value.equipment_id, 'Event type:', type);
          
          // Check if equipment belongs to selected location
          if (value.equipment_id && value.location_id) {
            const selectedEquipment = equipment.find(eq => eq.id === value.equipment_id);
            if (selectedEquipment && selectedEquipment.location_id !== value.location_id) {
              console.warn('Selected equipment may not belong to the selected location:', {
                equipmentId: value.equipment_id,
                equipmentLocation: selectedEquipment.location_id,
                selectedLocation: value.location_id
              });
            }
          }
        }
      });
      
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error in form watch subscription:', error);
    }
  }, [form, equipment]);

  return (
    <div className="space-y-6">
      <LocationSelect form={form} />
      <EquipmentSelect form={form} locationId={locationId || ''} />
      <TechnicianSelect form={form} technicians={technicians} />
    </div>
  );
};

export default MaintenanceBasicInfo;
