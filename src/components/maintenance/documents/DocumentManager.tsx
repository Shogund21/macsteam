import { useState } from "react";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./DocumentUpload";
import DocumentList from "./DocumentList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DocumentManagerProps {
  equipmentId?: string;
  maintenanceCheckId?: string;
  projectId?: string;
}

const DocumentManager = ({ equipmentId, maintenanceCheckId, projectId }: DocumentManagerProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Documents</h2>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Upload Documents
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Project Documents</DialogTitle>
            </DialogHeader>
            <DocumentUpload
              equipmentId={equipmentId}
              maintenanceCheckId={maintenanceCheckId}
              projectId={projectId}
              onUploadComplete={() => setIsUploadOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DocumentList
        equipmentId={equipmentId}
        maintenanceCheckId={maintenanceCheckId}
        projectId={projectId}
      />
    </div>
  );
};

export default DocumentManager;