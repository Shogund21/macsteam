import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceCheck } from "@/types/maintenance";
import { ScrollArea } from "@/components/ui/scroll-area";
import MaintenanceStatusBadge from "./details/MaintenanceStatusBadge";
import MaintenanceDetailsSection from "./details/MaintenanceDetailsSection";

interface MaintenanceCheckDetailsProps {
  check: MaintenanceCheck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MaintenanceCheckDetails = ({ check, open, onOpenChange }: MaintenanceCheckDetailsProps) => {
  const getTechnicianName = () => {
    if (!check.technician) return "Unassigned";
    return `${check.technician.firstName} ${check.technician.lastName}`;
  };

  const isAHU = check.equipment_type === 'ahu';

  const basicFields = [
    { label: "Date", value: new Date(check.check_date || "") },
    { label: "Technician", value: getTechnicianName() },
  ];

  const ahuFields = [
    { label: "Air Filter Cleaned", value: check.air_filter_cleaned },
    { label: "Fan Belt Condition", value: check.fan_belt_condition },
    { label: "Fan Bearings Lubricated", value: check.fan_bearings_lubricated },
    { label: "Fan Noise Level", value: check.fan_noise_level },
    { label: "Dampers Operation", value: check.dampers_operation },
    { label: "Coils Condition", value: check.coils_condition },
    { label: "Sensors Operation", value: check.sensors_operation },
    { label: "Motor Condition", value: check.motor_condition },
    { label: "Drain Pan Status", value: check.drain_pan_status },
  ];

  if (check.airflow_reading) {
    ahuFields.push({ 
      label: "Airflow Reading", 
      value: `${check.airflow_reading} ${check.airflow_unit}` 
    });
  }

  const standardFields = [
    { label: "Chiller Pressure (PSI)", value: check.chiller_pressure_reading },
    { label: "Chiller Temperature (°F)", value: check.chiller_temperature_reading },
    { label: "Air Filter Status", value: check.air_filter_status },
    { label: "Belt Condition", value: check.belt_condition },
    { label: "Refrigerant Level", value: check.refrigerant_level },
  ];

  const observationFields = [
    { label: "Unusual Noise", value: check.unusual_noise },
    ...(check.unusual_noise ? [{ label: "Noise Description", value: check.unusual_noise_description }] : []),
    { label: "Vibration Observed", value: check.vibration_observed },
    ...(check.vibration_observed ? [{ label: "Vibration Description", value: check.vibration_description }] : []),
    { label: "Oil Level Status", value: check.oil_level_status },
    { label: "Condenser Condition", value: check.condenser_condition },
  ];

  const notesFields = [
    { label: "Troubleshooting Notes", value: check.troubleshooting_notes },
    { label: "Corrective Actions", value: check.corrective_actions },
    { label: "Maintenance Recommendations", value: check.maintenance_recommendations },
  ].filter(field => field.value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {check.equipment?.name || 'Equipment Name Not Available'}
            </DialogTitle>
            <MaintenanceStatusBadge status={check.status} />
          </div>
          <div className="text-sm text-gray-600">
            Location: {check.equipment?.location || 'Location Not Available'}
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-1">
          <div className="space-y-6">
            <MaintenanceDetailsSection title="Basic Information" fields={basicFields} />

            {isAHU ? (
              <>
                <MaintenanceDetailsSection title="AHU Specific Checks" fields={ahuFields} />
                {notesFields.length > 0 && (
                  <MaintenanceDetailsSection title="Notes and Recommendations" fields={notesFields} />
                )}
              </>
            ) : (
              <>
                <MaintenanceDetailsSection title="Equipment Readings" fields={standardFields} />
                <MaintenanceDetailsSection title="Observations" fields={observationFields} />
              </>
            )}
            
            {check.notes && (
              <MaintenanceDetailsSection 
                title="Additional Notes" 
                fields={[{ label: "Notes", value: check.notes }]} 
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceCheckDetails;