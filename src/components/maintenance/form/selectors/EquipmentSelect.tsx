
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { useEffect } from "react";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const { toast } = useToast();
  const selectedEquipmentId = form.watch('equipment_id');
  
  // Use custom hook to get equipment for location
  const { data: equipment = [], isLoading, isError } = useEquipmentQuery(locationId);
  
  // Debug logs
  useEffect(() => {
    console.log('EquipmentSelect: locationId =', locationId);
    console.log('EquipmentSelect: selectedEquipmentId =', selectedEquipmentId);
    console.log('EquipmentSelect: equipment count =', equipment?.length || 0);
  }, [locationId, selectedEquipmentId, equipment]);
  
  // CRITICAL FIX: When location changes, clear equipment selection
  useEffect(() => {
    if (locationId) {
      const currentEquipId = form.getValues('equipment_id');
      
      // Only clear if equipment is already selected
      if (currentEquipId) {
        // Check if the currently selected equipment is valid for this location
        const isEquipmentValid = equipment.some(eq => eq.id === currentEquipId);
        
        if (!isEquipmentValid) {
          console.log('EquipmentSelect: Clearing equipment selection because it is not valid for the selected location');
          form.setValue('equipment_id', '', { shouldDirty: true, shouldTouch: true });
        } else {
          console.log('EquipmentSelect: Current equipment selection is valid for the location');
        }
      }
    }
  }, [locationId, equipment, form]);

  const handleEquipmentChange = (value: string) => {
    console.log('EquipmentSelect: Equipment selection changed to:', value);
    
    try {
      // CRITICAL FIX: Get the selected equipment details
      const selectedEquipment = equipment.find(eq => eq.id === value);
      
      if (selectedEquipment) {
        console.log('EquipmentSelect: Equipment location in database:', selectedEquipment.location);
        console.log('EquipmentSelect: Current selected locationId:', locationId);
        
        // Just log a warning if there's a location mismatch, but don't prevent selection
        // This allows users to select equipment even if it might have a different location in the DB
        if (selectedEquipment.location && !selectedEquipment.location.includes(locationId)) {
          console.warn('Selected equipment may have a different location in the database');
        }
      }
      
      // Set equipment ID in form
      form.setValue('equipment_id', value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
      
      // CRITICAL FIX: Verify the location_id is still intact after selecting equipment
      setTimeout(() => {
        console.log('EquipmentSelect: Verification - equipment_id after change:', form.getValues('equipment_id'));
        console.log('EquipmentSelect: Verification - location_id is still:', form.getValues('location_id'));
      }, 100);
      
    } catch (error) {
      console.error('Error in handleEquipmentChange:', error);
      toast({
        title: "Error selecting equipment",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Disable the dropdown when no location is selected
  const isDisabled = !locationId;

  return (
    <FormField
      control={form.control}
      name="equipment_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
          <Select
            onValueChange={handleEquipmentChange}
            value={field.value || ''}
            defaultValue={field.value || ''}
            disabled={isDisabled}
          >
            <FormControl>
              <SelectTrigger 
                className={`w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 transition-colors ${
                  isDisabled ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
              >
                <SelectValue 
                  placeholder={
                    isDisabled 
                      ? "Select a location first" 
                      : isLoading 
                      ? "Loading equipment..." 
                      : "Select equipment"
                  } 
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
            >
              {isLoading ? (
                <SelectItem value="loading" disabled className="py-3 px-4 text-sm text-gray-500">
                  Loading equipment...
                </SelectItem>
              ) : isError ? (
                <SelectItem value="error" disabled className="py-3 px-4 text-sm text-red-500">
                  Error loading equipment
                </SelectItem>
              ) : equipment.length > 0 ? (
                equipment.map((eq) => (
                  <SelectItem 
                    key={eq.id} 
                    value={eq.id}
                    className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{eq.name}</span>
                      <span className="text-sm text-gray-500">
                        {eq.model ? `Model: ${eq.model}` : 'No model specified'}
                      </span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-equipment" disabled className="py-3 px-4 text-sm text-gray-500">
                  No equipment available for this location
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default EquipmentSelect;
