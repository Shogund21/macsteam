import { useFileUpload } from "@/hooks/documents/useFileUpload";
import UploadZone from "./upload/UploadZone";
import FileList from "./upload/FileList";
import FileUploadForm from "./upload/FileUploadForm";
import { ALLOWED_FILE_TYPES } from "./upload/FileValidator";

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
  const {
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
  } = useFileUpload({
    equipmentId,
    maintenanceCheckId,
    projectId,
    onUploadComplete,
  });

  return (
    <div className="space-y-6">
      <UploadZone 
        onFileSelect={validateAndSetFiles}
        allowedFileTypes={ALLOWED_FILE_TYPES}
      />
      
      <FileList files={files} />

      <FileUploadForm
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