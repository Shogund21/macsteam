
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { Equipment } from "@/types/equipment";
import { useState } from "react";

interface QRCodeDialogProps {
  equipment: Equipment;
}

export function QRCodeDialog({ equipment }: QRCodeDialogProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button 
        variant="outline" 
        size="sm"
        className="text-[#1EAEDB] hover:text-[#33C3F0] hover:bg-blue-50"
        onClick={() => setOpen(true)}
      >
        <QrCode className="h-4 w-4 mr-2" />
        QR Code
      </Button>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">QR Code for {equipment.name}</DialogTitle>
          <DialogDescription>
            Print or share this QR code for quick access to equipment details.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <QRCodeGenerator equipment={equipment} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
