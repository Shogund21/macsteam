
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  url: string;
  initialSize?: number;
  qrCodeRef?: React.RefObject<HTMLDivElement>;
}

export function QRCodeDisplay({ url, initialSize = 200, qrCodeRef }: QRCodeDisplayProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const actualRef = qrCodeRef || internalRef;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Equipment QR Code</h3>
      </div>
      
      <div ref={actualRef} className="flex justify-center mb-6 qr-code-container">
        <QRCodeSVG 
          value={url}
          size={initialSize}
          level="H"
          includeMargin={true}
        />
      </div>
    </>
  );
}
