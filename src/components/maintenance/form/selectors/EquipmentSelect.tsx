
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EquipmentSelectProps {
  form: UseFormReturn<any>;
  locationId: string;
}

const EquipmentSelect = ({ form, locationId }: EquipmentSelectProps) => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load all equipment instead of filtering by location
  useEffect(() => {
    const fetchEquipment = async () => {
      if (!locationId) {
        console.log('No location selected, clearing equipment list');
        setEquipment([]);
        return;
      }

      setLoading(true);
      try {
        console.log('Fetching all equipment (not filtering by location)');
        const { data, error } = await supabase
          .from('equipment')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching equipment:', error);
          toast({
            variant: "destructive",
            title: "Error loading equipment",
            description: error.message
          });
          throw error;
        }
        
        console.log('Found equipment items:', data?.length || 0, 'total items');
        
        if (data && data.length === 0) {
          console.log('No equipment found in the database');
        } else {
          console.log('Equipment data sample:', data?.slice(0, 3));
        }
        
        setEquipment(data || []);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEquipment();
  }, [locationId, toast]);

  // Equipment selection handler - no filtering by location
  const handleEquipmentChange = (value: string) => {
    console.log('Selecting equipment:', value);
    form.setValue('equipment_id', value, { 
      shouldDirty: true, 
      shouldTouch: true,
      shouldValidate: true 
    });
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
            disabled={!locationId || loading}
          >
            <FormControl>
              <SelectTrigger 
                className="w-full bg-white border border-gray-200 h-12 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <SelectValue 
                  placeholder={
                    !locationId 
                      ? "Select location first" 
                      : loading 
                        ? "Loading equipment..." 
                        : equipment.length === 0 
                          ? "No equipment found" 
                          : "Select equipment"
                  }
                  className="text-gray-600"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-[--radix-select-trigger-width] max-h-[300px] overflow-y-auto"
            >
              {loading ? (
                <SelectItem 
                  value="loading" 
                  disabled 
                  className="py-3 px-4 text-sm text-gray-500"
                >
                  Loading equipment...
                </SelectItem>
              ) : equipment.length > 0 ? (
                equipment.map((item) => (
                  <SelectItem 
                    key={item.id} 
                    value={item.id}
                    className="py-3 px-4 hover:bg-blue-50 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.location && `Location: ${item.location}`} {item.model && `- Model: ${item.model}`}
                      </span>
                    </div>
                  </SelectItem>
                ))
              ) : (
                <SelectItem 
                  value="no-equipment" 
                  disabled 
                  className="py-3 px-4 text-sm text-gray-500"
                >
                  {!locationId 
                    ? "Select a location first" 
                    : "No equipment found in database"
                  }
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
