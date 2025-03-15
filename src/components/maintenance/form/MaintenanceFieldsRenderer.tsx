
import { UseFormReturn } from "react-hook-form";
import AHUMaintenanceFields from "./AHUMaintenanceFields";
import CoolingTowerFields from "./CoolingTowerFields";
import RestroomMaintenanceFields from "./RestroomMaintenanceFields";
import ElevatorMaintenanceFields from "./ElevatorMaintenanceFields";
import MaintenanceReadings from "./MaintenanceReadings";
import MaintenanceStatus from "./MaintenanceStatus";
import MaintenanceObservations from "./MaintenanceObservations";

interface MaintenanceFieldsRendererProps {
  form: UseFormReturn<any>;
  equipmentType: string | null;
}

const MaintenanceFieldsRenderer = ({ form, equipmentType }: MaintenanceFieldsRendererProps) => {
  switch (equipmentType) {
    case 'ahu':
      return <AHUMaintenanceFields form={form} />;
    case 'cooling_tower':
      return <CoolingTowerFields form={form} />;
    case 'restroom':
      return <RestroomMaintenanceFields form={form} />;
    case 'elevator':
      return <ElevatorMaintenanceFields form={form} />;
    case 'chiller':
    default:
      return (
        <>
          <MaintenanceReadings form={form} />
          <MaintenanceStatus form={form} />
          <MaintenanceObservations form={form} />
        </>
      );
  }
};

export default MaintenanceFieldsRenderer;
