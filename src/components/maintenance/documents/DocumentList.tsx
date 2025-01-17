import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DocumentCard from "./list/DocumentCard";
import { MaintenanceDocument } from "@/types/document";
import { DocumentSearch, DocumentFilters } from "./list/DocumentSearch";
import { useState } from "react";

interface DocumentListProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
  projectId?: string;
}

const DocumentList = ({ equipmentId, maintenanceCheckId, projectId }: DocumentListProps) => {
  const [filters, setFilters] = useState<DocumentFilters>({
    keyword: "",
  });

  const { data: documents, isLoading, refetch } = useQuery({
    queryKey: ['documents', equipmentId, maintenanceCheckId, projectId, filters],
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
      
      // Apply filters
      if (filters.keyword) {
        query = query.or(`file_name.ilike.%${filters.keyword}%,comments.ilike.%${filters.keyword}%`);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.startDate) {
        query = query.gte('uploaded_at', filters.startDate.toISOString());
      }
      if (filters.endDate) {
        query = query.lte('uploaded_at', filters.endDate.toISOString());
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
    <div className="space-y-6">
      <DocumentSearch onSearch={setFilters} />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((document) => (
          <DocumentCard 
            key={document.id} 
            document={document} 
            onDelete={() => refetch()}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentList;