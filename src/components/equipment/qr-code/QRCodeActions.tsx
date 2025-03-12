
import { useRef } from "react";
import { Printer, Download, Share2, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Equipment } from "@/types/equipment";
import { generateEquipmentUrl, generatePrintableHtml } from "./qrCodeUtils";

interface QRCodeActionsProps {
  equipment: Equipment;
  qrCodeContainerRef: React.RefObject<HTMLDivElement>;
  size: number;
}

export function QRCodeActions({ equipment, qrCodeContainerRef, size }: QRCodeActionsProps) {
  const { toast } = useToast();
  const equipmentUrl = generateEquipmentUrl(equipment.id);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Error",
        description: "Unable to open print window. Please check your popup blocker.",
        variant: "destructive",
      });
      return;
    }
    
    printWindow.document.write(generatePrintableHtml(equipment, qrCodeContainerRef.current?.innerHTML || ''));
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setTimeout(() => printWindow.close(), 500);
  };

  const handleDownload = () => {
    // Updated SVG selection and conversion to PNG
    const svg = document.querySelector('.qr-code-container svg') as SVGElement;
    if (!svg) {
      toast({
        title: "Error",
        description: "QR code SVG not found.",
        variant: "destructive",
      });
      return;
    }

    // Create a canvas and draw the SVG on it
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    // Set canvas dimensions
    canvas.width = size;
    canvas.height = size;
    
    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `${equipment.name.replace(/\s+/g, '_')}_QRCode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Success",
          description: "QR code downloaded successfully.",
        });
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopyLink = () => {
    // In production, this would be an absolute URL
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${equipmentUrl}`;
    
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        toast({
          title: "Success",
          description: "Link copied to clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy link.",
          variant: "destructive",
        });
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `QR Code for ${equipment.name}`,
        text: `Equipment details for ${equipment.name}`,
        url: equipmentUrl,
      }).catch(() => {
        toast({
          title: "Error",
          description: "Failed to share QR code.",
          variant: "destructive",
        });
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Button 
        onClick={handlePrint}
        className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
      >
        <Printer className="mr-2 h-4 w-4" /> Print
      </Button>
      <Button 
        onClick={handleDownload}
        className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
      >
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button 
        onClick={handleCopyLink}
        className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
      >
        <Clipboard className="mr-2 h-4 w-4" /> Copy Link
      </Button>
      <Button 
        onClick={handleShare}
        className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
      >
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
    </div>
  );
}
