
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import ElevatorOperationalStatus from "./elevator/ElevatorOperationalStatus";
import ElevatorSafetyFeatures from "./elevator/ElevatorSafetyFeatures";
import ElevatorNotes from "./elevator/ElevatorNotes";

interface ElevatorMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorMaintenanceFields = ({ form }: ElevatorMaintenanceFieldsProps) => {
  return (
    <div className="space-y-6">
      <ElevatorOperationalStatus form={form} />
      <ElevatorSafetyFeatures form={form} />
      <ElevatorNotes form={form} />
    </div>
  );
};

export default ElevatorMaintenanceFields;
