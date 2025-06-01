
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { useEffect } from "react";
import { Equipment } from "@/types/equipment";
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const selectedEquipmentId = form.watch('equipment_id');
  
  // Use custom hook to get equipment for location
  const { data: equipment = [], isLoading, isError } = useEquipmentQuery(locationId);
  
  // Debug logs
  useEffect(() => {
    console.log('EquipmentSelect: 📍 Location and equipment debug:', {
      locationId,
      selectedEquipmentId,
      equipmentCount: equipment?.length || 0,
      isMobile: isMobile
    });
  }, [locationId, selectedEquipmentId, equipment, isMobile]);

  const handleEquipmentChange = (value: string) => {
    console.log('EquipmentSelect: 🔄 Equipment selection changed to:', value);
    console.log('EquipmentSelect: 📱 Mobile debug - isMobile:', isMobile);
    
    try {
      // Get the selected equipment details
      const selectedEquipment = equipment.find(eq => eq.id === value) as Equipment | undefined;
      
      if (selectedEquipment) {
        console.log('EquipmentSelect: ✅ Equipment selected:', {
          id: selectedEquipment.id,
          name: selectedEquipment.name,
          databaseLocation: selectedEquipment.location,
          userSelectedLocation: locationId,
          isMobile: isMobile
        });
      }
      
      // Set equipment ID in form
      form.setValue('equipment_id', value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
      
      // Mobile-specific verification
      setTimeout(() => {
        const formValues = form.getValues();
        console.log('EquipmentSelect: 📱 Mobile verification after equipment change:', {
          equipmentId: formValues.equipment_id,
          locationId: formValues.location_id,
          allFormValues: formValues,
          isMobile: isMobile
        });
      }, 100);
      
    } catch (error) {
      console.error('EquipmentSelect: ❌ Error in handleEquipmentChange:', error);
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
    <div className="w-full" data-component="equipment-select-wrapper">
      <FormField
        control={form.control}
        name="equipment_id"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
            <Select
              onValueChange={handleEquipmentChange}
              value={field.value || ''}
              defaultValue={field.value || ''}
              disabled={isDisabled}
            >
              <FormControl>
                <SelectTrigger 
                  className={`w-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors ${
                    isMobile ? 'min-h-[52px] text-base px-4' : 'h-12'
                  } ${
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
                className="z-[1000] bg-white divide-y divide-gray-100 rounded-lg shadow-lg max-h-[300px] overflow-y-auto"
                {...(isMobile ? {} : { position: "popper" })}
              >
                {isLoading ? (
                  <SelectItem value="loading-placeholder" disabled className={`text-gray-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}>
                    Loading equipment...
                  </SelectItem>
                ) : isError ? (
                  <SelectItem value="error-placeholder" disabled className={`text-red-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}>
                    Error loading equipment
                  </SelectItem>
                ) : equipment.length > 0 ? (
                  equipment.map((eq) => (
                    <SelectItem 
                      key={eq.id} 
                      value={eq.id}
                      className={`cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-600 ${
                        isMobile ? 'py-4 px-4' : 'py-3 px-4'
                      }`}
                    >
                      <div className="flex flex-col w-full">
                        <span className={`font-medium text-gray-900 ${isMobile ? 'text-base' : ''}`}>
                          {eq.name}
                        </span>
                        <span className={`text-gray-500 ${isMobile ? 'text-sm mt-1' : 'text-sm'}`}>
                          {eq.model ? `Model: ${eq.model}` : 'No model specified'}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-equipment-placeholder" disabled className={`text-gray-500 ${isMobile ? 'py-4 px-4 text-base' : 'py-3 px-4 text-sm'}`}>
                    No equipment available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EquipmentSelect;
