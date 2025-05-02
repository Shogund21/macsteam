
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/schema/maintenanceFormSchema";
import RestroomFixturesStatus from "./restroom/RestroomFixturesStatus";
import RestroomCleanlinessSupplies from "./restroom/RestroomCleanlinessSupplies";
import RestroomNotes from "./restroom/RestroomNotes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
    
    // CRITICAL FIX: Log selected location to confirm it's being tracked correctly
    console.log('Restroom component with equipment ID:', equipmentId, 'and location ID:', locationId);
    
  }, [form, equipmentId, locationId]);
  
  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800 text-sm font-medium">Location Information</AlertTitle>
        <AlertDescription className="text-blue-700 text-xs">
          This restroom maintenance check will be associated with your selected location.
          The location ID being used is: {locationId}
        </AlertDescription>
      </Alert>

      <RestroomFixturesStatus form={form} />
      <RestroomCleanlinessSupplies form={form} />
      <RestroomNotes form={form} />
    </div>
  );
};

export default RestroomMaintenanceFields;
