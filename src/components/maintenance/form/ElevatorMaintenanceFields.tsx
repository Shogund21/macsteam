
import { UseFormReturn } from "react-hook-form";
import ElevatorOperationalStatus from "./elevator/ElevatorOperationalStatus";
import ElevatorPhoneSystem from "./elevator/ElevatorPhoneSystem";
import ElevatorLightingStatus from "./elevator/ElevatorLightingStatus";
import ElevatorNotes from "./elevator/ElevatorNotes";

interface ElevatorMaintenanceFieldsProps {
  form: UseFormReturn<any>;
}

const ElevatorMaintenanceFields = ({ form }: ElevatorMaintenanceFieldsProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Elevator Maintenance Check</h3>
      
      <ElevatorOperationalStatus form={form} />
      <ElevatorPhoneSystem form={form} />
      <ElevatorLightingStatus form={form} />
      <ElevatorNotes form={form} />
    </>
  );
};

export default ElevatorMaintenanceFields;
