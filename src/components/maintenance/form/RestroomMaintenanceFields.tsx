
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/schema/maintenanceFormSchema";
import RestroomFixturesStatus from "./restroom/RestroomFixturesStatus";
import RestroomCleanlinessSupplies from "./restroom/RestroomCleanlinessSupplies";
import RestroomNotes from "./restroom/RestroomNotes";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  // Get the equipment and location information
  const equipmentId = form.watch('equipment_id');
  const locationId = form.watch('location_id');
  
  // Make sure the restroom notes field is registered
  React.useEffect(() => {
    if (!form.getValues('restroom_notes')) {
      // Ensure the field exists in form state
      form.register('restroom_notes');
    }
    
    // Log selected location to track it correctly
    console.log('Restroom component with equipment ID:', equipmentId, 'and location ID:', locationId);
    // No need to check for location mismatches anymore - all equipment is available for all locations
    
  }, [form, equipmentId, locationId]);
  
  return (
    <div className="space-y-6">
      <RestroomFixturesStatus form={form} />
      <RestroomCleanlinessSupplies form={form} />
      <RestroomNotes form={form} />
    </div>
  );
};

export default RestroomMaintenanceFields;
