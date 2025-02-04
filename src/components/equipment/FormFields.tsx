import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EquipmentFormValues } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormFieldsProps {
  form: UseFormReturn<EquipmentFormValues>;
}

const EQUIPMENT_TYPES = [
  "Air Handling Unit (AHU)",
  "Air Handler Unit 1",
  "Air Handler Unit 2",
  "Air Handler Unit 3",
  "Air Handler Unit 4",
  "Air Handler Unit 5",
  "Air Handler Unit 6",
  "Air Handler Unit 7",
  "Air Handler Unit 8",
  "Air Handler Unit 9",
  "Air Handler Unit 10",
  "Air Handler Unit 11",
  "Air Handler Unit 12",
  "Air Handler Unit 13",
  "Air Handler Unit 14",
  "Air Handler Unit 15",
  "Air Handler Unit 16",
  "Air Handler Unit 17",
  "Air Handler Unit 18",
  "Air Handler Unit 19",
  "Chiller",
  "Cooling Tower",
  "Boiler",
  "Fan Coil Unit",
  "Heat Pump",
  "Package Unit",
  "Split System",
  "VAV Box",
  "VRF System",
];

const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Equipment Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full bg-white border-gray-200 h-12">
                  <SelectValue placeholder="Select equipment type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {EQUIPMENT_TYPES.map((type) => (
                  <SelectItem 
                    key={type} 
                    value={type}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">Model (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter model" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="serialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">Serial Number (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter serial number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-600">Status (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter status" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFields;