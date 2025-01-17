import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { File } from "lucide-react";
import { MaintenanceDocument } from "@/types/maintenance";
import { DocumentActions } from "./DocumentActions";

interface DocumentCardProps {
  document: MaintenanceDocument;
  onDownload: (doc: MaintenanceDocument) => Promise<void>;
  onDelete: (doc: MaintenanceDocument) => Promise<void>;
}

export const DocumentCard = ({ document, onDownload, onDelete }: DocumentCardProps) => {
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
          <DocumentActions
            document={document}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge>{document.category}</Badge>
          {document.tags && document.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
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