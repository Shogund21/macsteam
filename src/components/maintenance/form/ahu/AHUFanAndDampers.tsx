
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

interface AHUFanAndDampersProps {
  form: UseFormReturn<any>;
}

const AHUFanAndDampers = ({ form }: AHUFanAndDampersProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="fan_bearings_lubricated"
        render={({ field }) => (
          <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-4 w-full ${
            isMobile ? 'min-h-[60px]' : ''
          }`}>
            <div className="space-y-0.5 flex-1">
              <FormLabel className={`${isMobile ? 'text-base' : 'text-base'}`}>
                Fan Bearings Lubricated
              </FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className={isMobile ? 'scale-125' : ''}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fan_noise_level"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Fan Noise Level
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`w-full bg-white border-gray-200 ${
                  isMobile ? 'min-h-[52px] text-base' : ''
                }`}>
                  <SelectValue placeholder="Select noise level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent 
                className="bg-white z-[100] shadow-lg"
                {...(isMobile ? {} : { position: "popper" })}
              >
                <SelectItem value="normal" className={isMobile ? 'py-3 text-base' : ''}>
                  Normal
                </SelectItem>
                <SelectItem value="slight" className={isMobile ? 'py-3 text-base' : ''}>
                  Slight Noise
                </SelectItem>
                <SelectItem value="concerning" className={isMobile ? 'py-3 text-base' : ''}>
                  Concerning Noise
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dampers_operation"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Dampers Operation
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
                <SelectItem value="restricted" className={isMobile ? 'py-3 text-base' : ''}>
                  Restricted
                </SelectItem>
                <SelectItem value="faulty" className={isMobile ? 'py-3 text-base' : ''}>
                  Faulty
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

export default AHUFanAndDampers;
