
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useMaintenanceFormContext } from "../context/MaintenanceFormContext";

interface CoolingTowerFieldsProps {
  form: UseFormReturn<any>;
}

const CoolingTowerFields = ({ form }: CoolingTowerFieldsProps) => {
  const { isMobile } = useMaintenanceFormContext();
  
  const statusOptions = [
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
    { value: "NA", label: "Not Applicable" },
  ];

  const fields = [
    { name: "general_inspection", label: "General Inspection" },
    { name: "water_system_status", label: "Water System Status" },
    { name: "fill_media_condition", label: "Fill Media Condition" },
    { name: "drift_eliminators_condition", label: "Drift Eliminators Condition" },
    { name: "fan_assembly_status", label: "Fan Assembly Status" },
    { name: "motor_lubrication_status", label: "Motor Lubrication Status" },
    { name: "pump_seals_condition", label: "Pump Seals Condition" },
    { name: "strainer_status", label: "Strainer Status" },
    { name: "sump_basin_condition", label: "Sump Basin Condition" },
    { name: "drainage_system_status", label: "Drainage System Status" },
    { name: "control_system_status", label: "Control System Status" },
    { name: "sensor_status", label: "Sensor Status" },
    { name: "seasonal_preparation_status", label: "Seasonal Preparation Status" },
    { name: "vibration_monitoring", label: "Vibration Monitoring" },
    { name: "emergency_shutdown_status", label: "Emergency Shutdown Status" },
    { name: "safety_features_status", label: "Safety Features Status" },
  ];

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold mb-4">Cooling Tower Inspection</h2>
      
      <div className={`w-full ${isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}`}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="w-full">
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <FormControl>
                    <SelectTrigger 
                      className={`w-full bg-white border border-gray-300 ${
                        isMobile ? 'min-h-[52px] text-base px-4' : 'min-h-[40px]'
                      }`}
                    >
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent 
                    className={`bg-white border border-gray-200 shadow-lg ${
                      isMobile ? 'z-[9999]' : 'z-[200]'
                    }`}
                    position="popper"
                    sideOffset={4}
                  >
                    {statusOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value} 
                        className={`cursor-pointer hover:bg-gray-50 ${
                          isMobile ? 'py-4 px-4 text-base min-h-[48px]' : 'py-2 px-3'
                        }`}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CoolingTowerFields;
