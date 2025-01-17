import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaintenanceDocument } from "@/types/document";

interface DocumentCardActionsProps {
  onDownload: () => void;
  onDelete: () => void;
}

export const DocumentCardActions = ({ onDownload, onDelete }: DocumentCardActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onDownload}
        title="Download"
      >
        <Download className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};