import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DocumentCard from "./list/DocumentCard";
import { MaintenanceDocument } from "@/types/document";

interface DocumentListProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
  projectId?: string;
}

const DocumentList = ({ equipmentId, maintenanceCheckId, projectId }: DocumentListProps) => {
  const { data: documents, isLoading, refetch } = useQuery({
    queryKey: ['documents', equipmentId, maintenanceCheckId, projectId],
    queryFn: async () => {
      let query = supabase
        .from('maintenance_documents')
        .select('*');

      if (equipmentId) {
        query = query.eq('equipment_id', equipmentId);
      }
      if (maintenanceCheckId) {
        query = query.eq('maintenance_check_id', maintenanceCheckId);
      }
      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MaintenanceDocument[];
    },
  });

  if (isLoading) {
    return <div>Loading documents...</div>;
  }

  if (!documents?.length) {
    return <div className="text-muted-foreground">No documents uploaded yet.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard 
          key={document.id} 
          document={document} 
          onDelete={() => refetch()}
        />
      ))}
    </div>
  );
};

export default DocumentList;