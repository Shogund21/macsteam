import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { MaintenanceDocument } from "@/types/maintenance";

interface DocumentActionsProps {
  document: MaintenanceDocument;
  onDownload: (doc: MaintenanceDocument) => Promise<void>;
  onDelete: (doc: MaintenanceDocument) => Promise<void>;
}

export const DocumentActions = ({ document, onDownload, onDelete }: DocumentActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDownload(document)}
      >
        <Download className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDelete(document)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};