import { Card, CardHeader } from "@/components/ui/card";
import { MaintenanceDocument } from "@/types/document";
import { useDocumentOperations } from "@/hooks/documents/useDocumentOperations";
import { DocumentCardHeader } from "./DocumentCardHeader";
import { DocumentCardActions } from "./DocumentCardActions";
import { DocumentCardContent } from "./DocumentCardContent";

interface DocumentCardProps {
  document: MaintenanceDocument;
  onDelete?: () => void;
}

const DocumentCard = ({ document: doc, onDelete }: DocumentCardProps) => {
  const { handleDownload, handleDelete } = useDocumentOperations();

  const handleDocumentDelete = async () => {
    const success = await handleDelete(doc);
    if (success && onDelete) {
      onDelete();
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <DocumentCardHeader doc={doc} />
        <DocumentCardActions
          onDownload={() => handleDownload(doc)}
          onDelete={handleDocumentDelete}
        />
      </CardHeader>
      <DocumentCardContent doc={doc} />
    </Card>
  );
};

export default DocumentCard;