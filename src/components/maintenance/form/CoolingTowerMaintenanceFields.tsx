import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CoolingTowerMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const CoolingTowerMaintenanceFields = ({ form }: CoolingTowerMaintenanceFieldsProps) => {
  const conditionOptions = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
    { value: "critical", label: "Critical" },
  ];

  const renderConditionField = (name: string, label: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full bg-white border border-gray-200 shadow-sm">
                <SelectValue placeholder={`Select ${label.toLowerCase()} status`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent 
              className="bg-white border border-gray-200 shadow-lg z-[100]"
              position="popper"
              sideOffset={5}
            >
              {conditionOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-gray-100 cursor-pointer"
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
  );

  const renderNotesField = (name: string, label: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-sm font-medium">{label} Notes</FormLabel>
          <FormControl>
            <Textarea
              placeholder={`Enter ${label.toLowerCase()} notes here...`}
              className="min-h-[80px] resize-none bg-white border-gray-200"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderConditionField("general_inspection", "General Inspection")}
        {renderConditionField("water_system_status", "Water System")}
        {renderConditionField("fill_media_condition", "Fill Media")}
        {renderConditionField("drift_eliminators_condition", "Drift Eliminators")}
        {renderConditionField("fan_assembly_status", "Fan Assembly")}
        {renderConditionField("motor_lubrication_status", "Motor Lubrication")}
        {renderConditionField("pump_seals_condition", "Pump Seals")}
        {renderConditionField("strainer_status", "Strainer")}
        {renderConditionField("sump_basin_condition", "Sump Basin")}
        {renderConditionField("drainage_system_status", "Drainage System")}
        {renderConditionField("control_system_status", "Control System")}
        {renderConditionField("sensor_status", "Sensors")}
        {renderConditionField("seasonal_preparation_status", "Seasonal Preparation")}
        {renderConditionField("vibration_monitoring", "Vibration Monitoring")}
        {renderConditionField("emergency_shutdown_status", "Emergency Shutdown")}
        {renderConditionField("safety_features_status", "Safety Features")}
      </div>
      
      <div className="space-y-4">
        {renderNotesField("notes", "Additional")}
      </div>
    </div>
  );
};

export default CoolingTowerMaintenanceFields;