
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "../hooks/useMaintenanceForm";
import ElevatorOperationalStatus from "./ElevatorOperationalStatus";
import ElevatorSafetyFeatures from "./ElevatorSafetyFeatures";
import ElevatorNotes from "./ElevatorNotes";

interface ElevatorMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const ElevatorMaintenanceFields = ({ form }: ElevatorMaintenanceFieldsProps) => {
  return (
    <>
      <ElevatorOperationalStatus form={form} />
      <ElevatorSafetyFeatures form={form} />
      <ElevatorNotes form={form} />
    </>
  );
};

export default ElevatorMaintenanceFields;
