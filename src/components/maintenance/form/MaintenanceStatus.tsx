
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
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold">Maintenance Status</h3>
      <div className={isMobile ? "space-y-4 w-full" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <FormField
          control={form.control}
          name="refrigerant_level"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium text-gray-700">Refrigerant Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  className="bg-white border border-gray-200 shadow-lg z-[200]"
                  position="popper"
                  sideOffset={4}
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
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium text-gray-700">Oil Level Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  className="bg-white border border-gray-200 shadow-lg z-[200]"
                  position="popper"
                  sideOffset={4}
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
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium text-gray-700">Condenser Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`bg-white border border-gray-300 ${isMobile ? 'min-h-[52px] text-base' : ''}`}>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                  className="bg-white border border-gray-200 shadow-lg z-[200]"
                  position="popper"
                  sideOffset={4}
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
    </div>
  );
};

export default MaintenanceStatus;
