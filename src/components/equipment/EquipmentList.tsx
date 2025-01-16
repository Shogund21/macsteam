import { Equipment } from "@/types/equipment";
import { EquipmentCard } from "./EquipmentCard";

interface EquipmentListProps {
  equipment: Equipment[];
  onStatusChange: (equipmentId: string, newStatus: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const EquipmentList = ({ equipment, onStatusChange, onDelete }: EquipmentListProps) => {
  if (!equipment?.length) {
    return <p className="text-center py-4">No equipment found. Add some equipment to get started.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {equipment.map((item) => (
        <EquipmentCard
          key={item.id}
          equipment={item}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};