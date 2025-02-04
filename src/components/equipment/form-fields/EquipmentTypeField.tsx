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
import { EQUIPMENT_TYPES } from "../constants/equipmentTypes";
import { EquipmentFormValues } from "../types";

interface EquipmentTypeFieldProps {
  form: UseFormReturn<EquipmentFormValues>;
}

const EquipmentTypeField = ({ form }: EquipmentTypeFieldProps) => {
  return (
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
  );
};

export default EquipmentTypeField;