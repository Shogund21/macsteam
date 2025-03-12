
import { useState, useRef } from "react";
import { QrCode, Printer, Download, Share2, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react"; // Changed from default import to named import
import { Equipment } from "@/types/equipment";

interface QRCodeGeneratorProps {
  equipment: Equipment;
}

export function QRCodeGenerator({ equipment }: QRCodeGeneratorProps) {
  const [size, setSize] = useState(200);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Generate a URL for this equipment (in production this would be absolute)
  const equipmentUrl = `/equipment/details/${equipment.id}`;
  
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
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Equipment QR Code - ${equipment.name}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .container { margin: 20px; }
            .details { margin-top: 20px; }
            table { margin: 0 auto; border-collapse: collapse; }
            td, th { padding: 8px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Equipment QR Code</h2>
            ${qrCodeRef.current?.innerHTML || ''}
            <div class="details">
              <h3>${equipment.name}</h3>
              <table>
                <tr>
                  <th>Model</th>
                  <td>${equipment.model || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Serial Number</th>
                  <td>${equipment.serialNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>${equipment.location || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>${equipment.status || 'N/A'}</td>
                </tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `);
    
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

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Equipment QR Code</h3>
        <div className="space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setSize(Math.max(100, size - 50))}
            disabled={size <= 100}
          >
            -
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setSize(Math.min(400, size + 50))}
            disabled={size >= 400}
          >
            +
          </Button>
        </div>
      </div>
      
      <div ref={qrCodeRef} className="flex justify-center mb-6 qr-code-container">
        <QRCodeSVG 
          value={equipmentUrl}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      
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
          onClick={() => {
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
          }}
          className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
}
