import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MaintenanceCheckDetailsProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MaintenanceCheckDetails = ({ check, open, onOpenChange }: MaintenanceCheckDetailsProps) => {
  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "Not recorded";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return format(value, "PPP");
    return value.toString();
  };

  const renderField = (label: string, value: any) => (
    <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-600">{formatValue(value)}</span>
    </div>
  );

  const isAHU = check.equipment_type === 'ahu';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {isAHU ? "AHU Maintenance Check Details" : "Maintenance Check Details"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-1">
          <div className="space-y-1">
            {renderField("Date", new Date(check.check_date || ""))}
            {renderField("Equipment", check.equipment?.name)}
            {renderField("Location", check.equipment?.location)}
            {renderField("Technician", 
              check.technician ? 
              `${check.technician.firstName} ${check.technician.lastName}` : 
              "Unassigned"
            )}
            {renderField("Status", check.status)}

            {isAHU ? (
              <>
                {renderField("Air Filter Cleaned", check.air_filter_cleaned)}
                {renderField("Fan Belt Condition", check.fan_belt_condition)}
                {renderField("Fan Bearings Lubricated", check.fan_bearings_lubricated)}
                {renderField("Fan Noise Level", check.fan_noise_level)}
                {renderField("Dampers Operation", check.dampers_operation)}
                {renderField("Coils Condition", check.coils_condition)}
                {renderField("Sensors Operation", check.sensors_operation)}
                {renderField("Motor Condition", check.motor_condition)}
                {renderField("Drain Pan Status", check.drain_pan_status)}
                {check.airflow_reading && renderField("Airflow Reading", `${check.airflow_reading} ${check.airflow_unit}`)}
                {check.troubleshooting_notes && renderField("Troubleshooting Notes", check.troubleshooting_notes)}
                {check.corrective_actions && renderField("Corrective Actions", check.corrective_actions)}
                {check.maintenance_recommendations && renderField("Maintenance Recommendations", check.maintenance_recommendations)}
              </>
            ) : (
              <>
                {renderField("Chiller Pressure (PSI)", check.chiller_pressure_reading)}
                {renderField("Chiller Temperature (°F)", check.chiller_temperature_reading)}
                {renderField("Air Filter Status", check.air_filter_status)}
                {renderField("Belt Condition", check.belt_condition)}
                {renderField("Refrigerant Level", check.refrigerant_level)}
                {renderField("Unusual Noise", check.unusual_noise)}
                {check.unusual_noise && renderField("Noise Description", check.unusual_noise_description)}
                {renderField("Vibration Observed", check.vibration_observed)}
                {check.vibration_observed && renderField("Vibration Description", check.vibration_description)}
                {renderField("Oil Level Status", check.oil_level_status)}
                {renderField("Condenser Condition", check.condenser_condition)}
              </>
            )}
            
            {renderField("Additional Notes", check.notes)}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceCheckDetails;