
import { useRef, useState } from "react";
import { Equipment } from "@/types/equipment";
import { QRCodeDisplay } from "./qr-code/QRCodeDisplay";
import { QRCodeActions } from "./qr-code/QRCodeActions";
import { generateEquipmentUrl } from "./qr-code/qrCodeUtils";

interface QRCodeGeneratorProps {
  equipment: Equipment;
}

export function QRCodeGenerator({ equipment }: QRCodeGeneratorProps) {
  const [size, setSize] = useState(200);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  // Generate a URL for this equipment
  const equipmentUrl = generateEquipmentUrl(equipment.id);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <QRCodeDisplay url={equipmentUrl} initialSize={size} />
      
      <QRCodeActions 
        equipment={equipment} 
        qrCodeContainerRef={qrCodeRef} 
        size={size} 
      />
    </div>
  );
}
