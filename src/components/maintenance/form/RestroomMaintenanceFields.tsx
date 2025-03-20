
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
    
    // Instead of defaulting to a hardcoded location (806), we should preserve
    // the location that was selected with the equipment
    const selectedLocationId = form.watch('location_id');
    console.log('Restroom component with equipment ID:', equipmentId, 'and location ID:', selectedLocationId);
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
