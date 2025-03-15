
import { UseFormReturn } from "react-hook-form";
import RestroomFixturesStatus from "./restroom/RestroomFixturesStatus";
import RestroomCleanliness from "./restroom/RestroomCleanliness";
import RestroomNotes from "./restroom/RestroomNotes";

interface RestroomMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const RestroomMaintenanceFields = ({ form }: RestroomMaintenanceFieldsProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Restroom Maintenance Check</h3>
      
      <RestroomFixturesStatus form={form} />
      <RestroomCleanliness form={form} />
      <RestroomNotes form={form} />
    </>
  );
};

export default RestroomMaintenanceFields;
