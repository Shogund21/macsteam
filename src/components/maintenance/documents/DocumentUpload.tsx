import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import UploadZone from "./upload/UploadZone";
import FileList from "./upload/FileList";
import UploadForm from "./upload/UploadForm";

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface DocumentUploadProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
  projectId?: string;
  onUploadComplete?: () => void;
}

const DocumentUpload = ({ 
  equipmentId, 
  maintenanceCheckId,
  projectId,
  onUploadComplete 
}: DocumentUploadProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [category, setCategory] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const validateAndSetFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const invalidFiles = Array.from(fileList).filter(
      file => !ALLOWED_FILE_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
    );

    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid files detected",
        description: "Please ensure all files are of the correct type and under 10MB",
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

      setFiles(null);
      setCategory("");
      setComments("");
      setTags("");
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

  return (
    <div className="space-y-6">
      <UploadZone 
        onFileSelect={validateAndSetFiles}
        allowedFileTypes={ALLOWED_FILE_TYPES}
      />
      
      <FileList files={files} />

      <UploadForm
        category={category}
        setCategory={setCategory}
        tags={tags}
        setTags={setTags}
        comments={comments}
        setComments={setComments}
        onUpload={uploadFiles}
        isUploading={isUploading}
        hasFiles={!!files}
      />
    </div>
  );
};

export default DocumentUpload;