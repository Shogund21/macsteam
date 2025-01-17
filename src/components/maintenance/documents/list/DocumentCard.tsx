import { Button } from "@/components/ui/button";
import { File, Download, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceDocument {
  id: string;
  file_name: string;
  file_path: string;
  category: string;
  uploaded_at: string;
  tags: string[];
  comments: string;
}

interface DocumentCardProps {
  document: MaintenanceDocument;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('maintenance_docs')
        .download(document.file_path);

      if (error) throw error;

      // Create a download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = document.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download the document",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('maintenance_docs')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('maintenance_documents')
        .delete()
        .eq('id', document.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete the document",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
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
              onClick={handleDownload}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
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
  );
};

export default DocumentCard;