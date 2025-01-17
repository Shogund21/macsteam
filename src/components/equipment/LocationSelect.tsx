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
  { id: "776A", name: "776A" },
  { id: "776B", name: "776B" },
  { id: "777", name: "777" },
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