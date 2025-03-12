
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink } from "lucide-react";

interface QRCodeDisplayProps {
  url: string;
  initialSize?: number;
  qrCodeRef?: React.RefObject<HTMLDivElement>;
}

export function QRCodeDisplay({ url, initialSize = 200, qrCodeRef }: QRCodeDisplayProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const actualRef = qrCodeRef || internalRef;
  
  // Extract just the path part for display purposes
  const displayUrl = url.includes('/') ? new URL(url).pathname : url;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Equipment QR Code</h3>
      </div>
      
      <div ref={actualRef} className="flex justify-center mb-4 qr-code-container">
        <QRCodeSVG 
          value={url}
          size={initialSize}
          level="H"
          includeMargin={true}
        />
      </div>
      
      <div className="text-sm text-center mb-6">
        <p className="text-muted-foreground mb-1">Scan to view equipment details</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex items-center justify-center"
        >
          {displayUrl} <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </>
  );
}
