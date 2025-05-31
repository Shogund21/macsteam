
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface MaintenanceStatusProps {
  form: UseFormReturn<any>;
}

const MaintenanceStatus = ({ form }: MaintenanceStatusProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  console.log('MaintenanceStatus: 📱 MOBILE RENDER:', { isMobile, width: typeof window !== 'undefined' ? window.innerWidth : 'unknown' });
  
  return (
    <div className={`maintenance-status-container ${isMobile ? 'mobile-status-layout space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}`}>
      {isMobile && (
        <div className="mobile-debug-indicator" style={{
          backgroundColor: '#fff3e0',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#ef6c00',
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          📱 Mobile: Maintenance Status Section
        </div>
      )}
      
      <FormField
        control={form.control}
        name="refrigerant_level"
        render={({ field }) => (
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Refrigerant Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Oil Level Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
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
          <FormItem className={isMobile ? 'mobile-form-item' : ''}>
            <FormLabel>Condenser Condition</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={`bg-white border border-gray-200 ${isMobile ? 'mobile-select-trigger' : ''}`}>
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
