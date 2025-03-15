
import { Equipment } from "@/types/equipment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Pen, QrCode } from "lucide-react";
import { StatusDropdown } from "./StatusDropdown";
import { DeleteEquipmentDialog } from "./DeleteEquipmentDialog";
import { QRCodeDialog } from "./QRCodeDialog";
import { EditEquipmentDialog } from "./EditEquipmentDialog";
import { useNavigate } from "react-router-dom";

interface EquipmentCardProps {
  equipment: Equipment;
  onStatusChange: (equipmentId: string, newStatus: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const EquipmentCard = ({ equipment, onStatusChange, onDelete }: EquipmentCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-4 md:p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer" onClick={() => navigate(`/equipment/${equipment.id}`)}>
          <h3 className="text-base md:text-lg font-semibold break-words">{equipment.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{equipment.location}</p>
          <div className="mt-2">
            <StatusDropdown 
              status={equipment.status} 
              onStatusChange={(newStatus) => onStatusChange(equipment.id, newStatus)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-2 mb-2 md:mb-0">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => navigate(`/equipment/${equipment.id}`)}
            >
              <QrCode className="h-4 w-4 mr-2" />
              View
            </Button>
            <EditEquipmentDialog equipment={equipment}>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center text-green-500 hover:text-green-600 hover:bg-green-50"
              >
                <Pen className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </EditEquipmentDialog>
          </div>
          <DeleteEquipmentDialog onDelete={() => onDelete(equipment.id)}>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DeleteEquipmentDialog>
        </div>
      </div>
      <div className="space-y-2 text-sm mt-4 cursor-pointer" onClick={() => navigate(`/equipment/${equipment.id}`)}>
        <p><span className="font-medium">Model:</span> {equipment.model}</p>
        <p><span className="font-medium">Serial Number:</span> {equipment.serialNumber}</p>
      </div>
    </Card>
  );
};
