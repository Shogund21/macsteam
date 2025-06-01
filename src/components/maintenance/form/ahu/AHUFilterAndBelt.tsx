
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";

interface AHUFilterAndBeltProps {
  form: UseFormReturn<any>;
}

const AHUFilterAndBelt = ({ form }: AHUFilterAndBeltProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="air_filter_cleaned"
        render={({ field }) => (
          <FormItem className={`flex flex-row items-center justify-between rounded-lg border p-4 w-full ${
            isMobile ? 'min-h-[60px]' : ''
          }`}>
            <div className="space-y-0.5 flex-1">
              <FormLabel className={`${isMobile ? 'text-base' : 'text-base'}`}>
                Air Filter Cleaned
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
        name="fan_belt_condition"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className={`${isMobile ? 'text-base' : ''} font-medium text-gray-700`}>
              Fan Belt Condition
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
                <SelectItem value="good" className={isMobile ? 'py-3 text-base' : ''}>
                  Good
                </SelectItem>
                <SelectItem value="fair" className={isMobile ? 'py-3 text-base' : ''}>
                  Fair
                </SelectItem>
                <SelectItem value="needs_replacement" className={isMobile ? 'py-3 text-base' : ''}>
                  Needs Replacement
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

export default AHUFilterAndBelt;
