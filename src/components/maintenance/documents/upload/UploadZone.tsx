import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (files: FileList) => void;
  allowedFileTypes: string[];
}

const UploadZone = ({ onFileSelect, allowedFileTypes }: UploadZoneProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileSelect(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: PDF, JPG, PNG, DOCX, XLSX (Max 10MB)
        </p>
      </div>
      <Input
        type="file"
        multiple
        accept={allowedFileTypes.join(",")}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        Select Files
      </Button>
    </div>
  );
};

export default UploadZone;