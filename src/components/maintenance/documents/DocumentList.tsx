import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { File, Download, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const handleDelete = async (document: Document) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('maintenance_docs')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('maintenance_documents')
        .delete()
        .eq('id', document.id);

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
        <Card key={document.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5" />
                  {document.file_name}
                </CardTitle>
                <CardDescription>
                  Uploaded on {new Date(document.uploaded_at).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(document)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(document)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {document.category}
              </Badge>
              {document.tags && document.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {document.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {document.comments && (
                <p className="text-sm text-gray-600">{document.comments}</p>
              )}
            </div>
          </CardContent>
        </Card>
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