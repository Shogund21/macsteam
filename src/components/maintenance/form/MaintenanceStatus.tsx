
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceStatusProps {
  form: UseFormReturn<any>;
}

const MaintenanceStatus = ({ form }: MaintenanceStatusProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  return (
    <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
      <FormField
        control={form.control}
        name="refrigerant_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Refrigerant Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border border-gray-200">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
              >
                <SelectItem value="optimal">Optimal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="needs_refill">Needs Refill</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="oil_level_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Oil Level Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border border-gray-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
              >
                <SelectItem value="optimal">Optimal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="needs_refill">Needs Refill</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="condenser_condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condenser Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white border border-gray-200">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
              >
                <SelectItem value="clean">Clean</SelectItem>
                <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                <SelectItem value="needs_service">Needs Service</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MaintenanceStatus;
