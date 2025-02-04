import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { EquipmentFormValues } from "../types";

interface OptionalTextFieldProps {
  form: UseFormReturn<EquipmentFormValues>;
  name: keyof EquipmentFormValues;
  label: string;
  placeholder: string;
}

const OptionalTextField = ({ form, name, label, placeholder }: OptionalTextFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-600">{label} (Optional)</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OptionalTextField;