import { useEquipmentStatus } from "@/hooks/equipment/useEquipmentStatus";
import StatusDropdown from "./StatusDropdown";

interface EquipmentItemProps {
  equipment: {
    id: string;
    name: string;
    location: string;
    status: string;
  };
}

const EquipmentItem = ({ equipment }: EquipmentItemProps) => {
  const { updateStatus } = useEquipmentStatus();

  return (
    <div className="p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-medium">{equipment.name}</p>
          <p className="text-sm text-muted-foreground">{equipment.location}</p>
        </div>
        <StatusDropdown
          status={equipment.status}
          onStatusChange={(newStatus) => updateStatus(equipment.id, newStatus)}
        />
      </div>
    </div>
  );
};

export default EquipmentItem;