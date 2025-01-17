import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceDocument } from "@/types/maintenance";
import { DocumentCard } from "./DocumentCard";
import { fetchDocuments, downloadDocument, deleteDocument } from "./documentUtils";

interface DocumentListProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
}

const DocumentList = ({ equipmentId, maintenanceCheckId }: DocumentListProps) => {
  const [documents, setDocuments] = useState<MaintenanceDocument[]>([]);
  const { toast } = useToast();

  const loadDocuments = async () => {
    try {
      const data = await fetchDocuments(equipmentId, maintenanceCheckId);
      setDocuments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (doc: MaintenanceDocument) => {
    try {
      await downloadDocument(doc);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (doc: MaintenanceDocument) => {
    try {
      await deleteDocument(doc);
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      loadDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [equipmentId, maintenanceCheckId]);

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      ))}
      {documents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No documents found
        </div>
      )}
    </div>
  );
};

export default DocumentList;