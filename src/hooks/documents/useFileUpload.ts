import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateFiles } from "@/components/maintenance/documents/upload/FileValidator";

interface UseFileUploadProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
  projectId?: string;
  onUploadComplete?: () => void;
}

export const useFileUpload = ({
  equipmentId,
  maintenanceCheckId,
  projectId,
  onUploadComplete,
}: UseFileUploadProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [category, setCategory] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const validateAndSetFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validation = validateFiles(fileList);
    if (!validation.valid) {
      toast({
        title: "Invalid files",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setFiles(fileList);
  };

  const uploadFiles = async () => {
    if (!files || !category) {
      toast({
        title: "Missing information",
        description: "Please select files and a category",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('maintenance_docs')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase
          .from('maintenance_documents')
          .insert({
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
            category,
            equipment_id: equipmentId,
            maintenance_check_id: maintenanceCheckId,
            project_id: projectId,
            comments,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Success",
        description: "Documents uploaded successfully",
      });

      resetForm();
      onUploadComplete?.();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFiles(null);
    setCategory("");
    setComments("");
    setTags("");
  };

  return {
    files,
    category,
    comments,
    tags,
    isUploading,
    setCategory,
    setComments,
    setTags,
    validateAndSetFiles,
    uploadFiles,
  };
};