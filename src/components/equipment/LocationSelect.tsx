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
  { id: "778", name: "AHU 1 - 778" },
  { id: "776B", name: "Ahu 1,2,6,7,8,9 2nd floor chiller mech room - 776B" },
  { id: "776B", name: "Ahu 13,14,15 3rd floor house keeping office - 776B" },
  { id: "776B", name: "Ahu 16,17,18 Location 3rd floor engineering shop/mech room - 776B" },
  { id: "778", name: "AHU 2 - 778" },
  { id: "778", name: "AHU 3 - 778" },
  { id: "776B", name: "Ahu 3,4,5,11,12 2nd floor luggage stock/mech room - 776B" },
  { id: "778", name: "AHU 4 - 778" },
  { id: "778", name: "AHU 5 - 778" },
  { id: "778", name: "AHU 6 - 778" },
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px] overflow-y-auto bg-white">
              {locations.map((location) => (
                <SelectItem 
                  key={`${location.id}-${location.name}`} 
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