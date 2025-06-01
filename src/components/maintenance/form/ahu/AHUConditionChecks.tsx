
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

interface AHUConditionChecksProps {
  form: UseFormReturn<any>;
}

const AHUConditionChecks = ({ form }: AHUConditionChecksProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="coils_condition"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Coils Condition
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="clean" className={isMobile ? 'py-3 text-base' : ''}>
                  Clean
                </SelectItem>
                <SelectItem value="needs_cleaning" className={isMobile ? 'py-3 text-base' : ''}>
                  Needs Cleaning
                </SelectItem>
                <SelectItem value="damaged" className={isMobile ? 'py-3 text-base' : ''}>
                  Damaged
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sensors_operation"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Sensors Operation
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select operation status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="normal" className={isMobile ? 'py-3 text-base' : ''}>
                  Normal
                </SelectItem>
                <SelectItem value="needs_calibration" className={isMobile ? 'py-3 text-base' : ''}>
                  Needs Calibration
                </SelectItem>
                <SelectItem value="faulty" className={isMobile ? 'py-3 text-base' : ''}>
                  Faulty
                </SelectItem>
                <SelectItem value="na" className={isMobile ? 'py-3 text-base' : ''}>
                  N/A
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="motor_condition"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Motor Condition
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="normal" className={isMobile ? 'py-3 text-base' : ''}>
                  Normal
                </SelectItem>
                <SelectItem value="overheating" className={isMobile ? 'py-3 text-base' : ''}>
                  Overheating
                </SelectItem>
                <SelectItem value="needs_service" className={isMobile ? 'py-3 text-base' : ''}>
                  Needs Service
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

export default AHUConditionChecks;
