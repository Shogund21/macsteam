import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import { format } from "date-fns";

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
    <div className="grid grid-cols-2 gap-4 py-2 border-b">
      <span className="font-medium text-gray-700">{label}</span>
      <span>{formatValue(value)}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Maintenance Check Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {renderField("Date", new Date(check.check_date || ""))}
          {renderField("Equipment", check.equipment?.name)}
          {renderField("Location", check.equipment?.location)}
          {renderField("Technician", 
            check.technician ? 
            `${check.technician.firstName} ${check.technician.lastName}` : 
            "Unassigned"
          )}
          {renderField("Status", check.status)}
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
          {renderField("Additional Notes", check.notes)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceCheckDetails;