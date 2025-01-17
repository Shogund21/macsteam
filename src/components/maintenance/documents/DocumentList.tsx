import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DocumentCard from "./list/DocumentCard";

interface Document {
  id: string;
  file_name: string;
  file_path: string;
  category: string;
  uploaded_at: string;
  tags: string[];
  comments: string;
}

interface DocumentListProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
}

const DocumentList = ({ equipmentId, maintenanceCheckId }: DocumentListProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    let query = supabase
      .from('maintenance_documents')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (equipmentId) {
      query = query.eq('equipment_id', equipmentId);
    }
    if (maintenanceCheckId) {
      query = query.eq('maintenance_check_id', maintenanceCheckId);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive",
      });
      return;
    }

    setDocuments(data as Document[]);
  };

  useEffect(() => {
    fetchDocuments();
  }, [equipmentId, maintenanceCheckId]);

  const handleDownload = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('maintenance_docs')
        .download(doc.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (doc: Document) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('maintenance_docs')
        .remove([doc.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('maintenance_documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });

      fetchDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

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