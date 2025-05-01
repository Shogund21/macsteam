
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
  // Get the equipment information to determine proper values
  const equipmentId = form.watch('equipment_id');
  
  // Make sure the restroom notes field is registered
  React.useEffect(() => {
    if (!form.getValues('restroom_notes')) {
      // Ensure the field exists in form state
      form.register('restroom_notes');
    }
    
    // CRITICAL FIX: Log selected location but DO NOT modify it
    const selectedLocationId = form.watch('location_id');
    console.log('Restroom component with equipment ID:', equipmentId, 'and location ID:', selectedLocationId);
    
    // We're no longer setting location_id to a hardcoded value (previously 806)
  }, [form, equipmentId]);
  
  return (
    <div className="space-y-6">
      <RestroomFixturesStatus form={form} />
      <RestroomCleanlinessSupplies form={form} />
      <RestroomNotes form={form} />
    </div>
  );
};

export default RestroomMaintenanceFields;
