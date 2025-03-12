
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  url: string;
  initialSize?: number;
}

export function QRCodeDisplay({ url, initialSize = 200 }: QRCodeDisplayProps) {
  const [size, setSize] = useState(initialSize);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Equipment QR Code</h3>
        <div className="space-x-2">
          <button 
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            onClick={() => setSize(Math.max(100, size - 50))}
            disabled={size <= 100}
          >
            -
          </button>
          <button 
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            onClick={() => setSize(Math.min(400, size + 50))}
            disabled={size >= 400}
          >
            +
          </button>
        </div>
      </div>
      
      <div ref={qrCodeRef} className="flex justify-center mb-6 qr-code-container">
        <QRCodeSVG 
          value={url}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
    </>
  );
}
