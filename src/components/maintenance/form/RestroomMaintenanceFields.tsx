
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";
import RestroomFixturesStatus from "./restroom/RestroomFixturesStatus";
import RestroomCleanlinessSupplies from "./restroom/RestroomCleanlinessSupplies";
import RestroomNotes from "./restroom/RestroomNotes";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<MaintenanceFormValues>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  return (
    <div className="space-y-6">
      <RestroomFixturesStatus form={form} />
      <RestroomCleanlinessSupplies form={form} />
      <RestroomNotes form={form} />
    </div>
  );
};

export default RestroomMaintenanceFields;
