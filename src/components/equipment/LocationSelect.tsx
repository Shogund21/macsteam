import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

const locations = [
  { id: "ahu1-778", name: "AHU 1 - 778" },
  { id: "ahu2-778", name: "AHU 2 - 778" },
  { id: "ahu3-778", name: "AHU 3 - 778" },
  { id: "ahu4-778", name: "AHU 4 - 778" },
  { id: "ahu5-778", name: "AHU 5 - 778" },
  { id: "ahu6-778", name: "AHU 6 - 778" },
  { id: "ahu-1269-776b", name: "AHU 1,2,6,7,8,9 2nd floor chiller mech room - 776B" },
  { id: "ahu-13-15-776b", name: "AHU 13,14,15 3rd floor house keeping office - 776B" },
  { id: "ahu-16-18-776b", name: "AHU 16,17,18 Location 3rd floor engineering shop/mech room - 776B" },
  { id: "ahu-3512-776b", name: "AHU 3,4,5,11,12 2nd floor luggage stock/mech room - 776B" },
];

interface LocationSelectProps {
  form: UseFormReturn<any>;
}

const LocationSelect = ({ form }: LocationSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-base font-semibold">Location</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || undefined}>
            <FormControl>
              <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px] overflow-y-auto bg-white">
              {locations.map((location) => (
                <SelectItem 
                  key={location.id} 
                  value={location.id}
                  className="py-3 text-sm"
                >
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationSelect;