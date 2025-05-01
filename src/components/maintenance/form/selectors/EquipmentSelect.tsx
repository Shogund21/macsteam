
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { toast } from "@/hooks/use-toast";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const { data: equipmentList = [], isLoading, error } = useEquipmentQuery(locationId);
  const currentEquipmentId = form.watch('equipment_id');

  console.log('Equipment Select Render:', {
    locationId,
    equipmentCount: equipmentList?.length,
    equipment: equipmentList,
    currentEquipmentId
  });

  // Log any errors from equipment query
  if (error) {
    console.error('Error fetching equipment:', error);
    toast({
      title: "Error loading equipment",
      description: error instanceof Error ? error.message : "Failed to load equipment for this location",
      variant: "destructive",
    });
  }

  const handleEquipmentChange = (value: string) => {
    try {
      console.log('EquipmentSelect: Setting equipment_id to:', value);
      
      // Log form state before change
      console.log('EquipmentSelect: Form state before change:', {
        locationId: form.getValues('location_id'),
        oldEquipmentId: form.getValues('equipment_id')
      });
      
      // Only change equipment_id, preserve location_id
      form.setValue('equipment_id', value, { 
        shouldDirty: true, 
        shouldTouch: true,
        shouldValidate: true 
      });
      
      // Verify the change was applied correctly
      const updatedEquipmentId = form.getValues('equipment_id');
      console.log('EquipmentSelect: Updated equipment_id:', updatedEquipmentId);
      
      if (updatedEquipmentId !== value) {
        console.error('Equipment ID was not set correctly. Expected:', value, 'Got:', updatedEquipmentId);
        toast({
          title: "Warning",
          description: "Equipment selection may not have been saved correctly",
          variant: "destructive",
        });
      } else {
        // Show a success toast for debugging
        const selectedEquipment = equipmentList.find(e => e.id === value);
        toast({
          title: "Equipment selected",
          description: `${selectedEquipment?.name || value}`,
        });
      }
    } catch (error) {
      console.error('Error in handleEquipmentChange:', error);
      toast({
        title: "Error selecting equipment",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <FormField
      control={form.control}
      name="equipment_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
          <Select
            onValueChange={handleEquipmentChange}
            value={field.value || ""}
            defaultValue={field.value || ""}
            disabled={!locationId}
          >
            <FormControl>
              <SelectTrigger 
                className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <SelectValue 
                  placeholder={locationId ? "Select equipment" : "Please select a location first"}
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
            >
              {!isLoading ? (
                equipmentList.length > 0 ? (
                  equipmentList.map((item) => (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          {item.model}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem 
                    value="no-equipment" 
                    disabled 
                    className="py-3 text-sm text-gray-500"
                  >
                    {locationId ? "No equipment found for this location" : "Please select a location first"}
                  </SelectItem>
                )
              ) : (
                <SelectItem 
                  value="loading" 
                  disabled 
                  className="py-3 text-sm text-gray-500"
                >
                  Loading equipment...
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
