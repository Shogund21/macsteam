import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MaintenanceDocument } from "@/types/document";

export const useDocumentOperations = () => {
  const { toast } = useToast();

  const handleDownload = async (doc: MaintenanceDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('maintenance_docs')
        .download(doc.file_path);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download document",
      });
    }
  };

  const handleDelete = async (doc: MaintenanceDocument) => {
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

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete document",
      });
      return false;
    }
  };

  return {
    handleDownload,
    handleDelete,
  };
};