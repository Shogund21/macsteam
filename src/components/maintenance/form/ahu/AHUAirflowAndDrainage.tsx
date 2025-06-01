
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

interface AHUAirflowAndDrainageProps {
  form: UseFormReturn<any>;
}

const AHUAirflowAndDrainage = ({ form }: AHUAirflowAndDrainageProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="drain_pan_status"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Drain Pan Status
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="clear" className={isMobile ? 'py-3 text-base' : ''}>
                  Clear
                </SelectItem>
                <SelectItem value="partially_blocked" className={isMobile ? 'py-3 text-base' : ''}>
                  Partially Blocked
                </SelectItem>
                <SelectItem value="blocked" className={isMobile ? 'py-3 text-base' : ''}>
                  Blocked
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="airflow_reading"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Airflow Reading
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base px-4' : ''
                }`}
                placeholder="Enter airflow reading"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="airflow_unit"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Airflow Unit
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="cfm" className={isMobile ? 'py-3 text-base' : ''}>
                  CFM
                </SelectItem>
                <SelectItem value="m3/h" className={isMobile ? 'py-3 text-base' : ''}>
                  m³/h
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AHUAirflowAndDrainage;
