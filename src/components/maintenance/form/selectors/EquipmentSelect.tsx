
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { FACILITY_EQUIPMENT } from "@/components/equipment/constants/equipmentTypes";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const { data: equipmentList = [], isLoading } = useEquipmentQuery(locationId);

  console.log('Equipment Select Render:', {
    locationId,
    equipmentCount: equipmentList?.length,
    equipment: equipmentList
  });

  // Function to get display name based on equipment type
  const getEquipmentDisplayName = (equipment: any) => {
    const facilityTypes = FACILITY_EQUIPMENT.map(type => type.toLowerCase());
    
    // For facility equipment (restrooms, elevators), we want to include the location
    if (facilityTypes.some(type => equipment.name.toLowerCase().includes(type))) {
      return `${equipment.name} (${equipment.location || 'All Locations'})`;
    }
    
    // For regular HVAC equipment, just show the name and model
    return equipment.name;
  };

  return (
    <FormField
      control={form.control}
      name="equipment_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-gray-700">Equipment</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
            defaultValue={field.value || ""}
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
                        <span className="font-medium text-gray-900">{getEquipmentDisplayName(item)}</span>
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
