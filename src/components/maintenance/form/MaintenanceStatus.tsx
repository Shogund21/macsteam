import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface MaintenanceStatusProps {
  form: UseFormReturn<any>;
}

const MaintenanceStatus = ({ form }: MaintenanceStatusProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="air_filter_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Air Filter Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select air filter status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                <SelectItem value="clean" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Clean</SelectItem>
                <SelectItem value="needs_cleaning" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Cleaning</SelectItem>
                <SelectItem value="needs_replacement" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Replacement</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="belt_condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Belt Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select belt condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                <SelectItem value="good" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Good</SelectItem>
                <SelectItem value="fair" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Fair</SelectItem>
                <SelectItem value="needs_replacement" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Replacement</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="refrigerant_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Refrigerant Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select refrigerant level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                <SelectItem value="optimal" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Optimal</SelectItem>
                <SelectItem value="low" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Low</SelectItem>
                <SelectItem value="needs_refill" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Refill</SelectItem>
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
            <FormLabel className="text-base font-semibold">Oil Level Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select oil level status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                <SelectItem value="optimal" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Optimal</SelectItem>
                <SelectItem value="low" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Low</SelectItem>
                <SelectItem value="needs_refill" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Refill</SelectItem>
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
            <FormLabel className="text-base font-semibold">Condenser Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-12 bg-white border border-gray-200 shadow-sm">
                  <SelectValue placeholder="Select condenser condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white border border-gray-200 shadow-lg z-[100]"
                position="popper"
                sideOffset={5}
              >
                <SelectItem value="clean" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Clean</SelectItem>
                <SelectItem value="needs_cleaning" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Needs Cleaning</SelectItem>
                <SelectItem value="damaged" className="py-3 text-sm hover:bg-gray-100 cursor-pointer">Damaged</SelectItem>
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