
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { File } from "lucide-react";
import { MaintenanceDocument } from "@/types/maintenance";
import { DocumentActions } from "./DocumentActions";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocumentCardProps {
  document: MaintenanceDocument;
  onDownload: (doc: MaintenanceDocument) => Promise<void>;
  onDelete: (doc: MaintenanceDocument) => Promise<void>;
}

export const DocumentCard = ({ document, onDownload, onDelete }: DocumentCardProps) => {
  const isMobile = useIsMobile();
  
  // Truncate filename if it's too long
  const displayFileName = document.file_name.length > 25 && isMobile
    ? document.file_name.substring(0, 22) + '...'
    : document.file_name;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
              <File className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{displayFileName}</span>
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {new Date(document.uploaded_at).toLocaleDateString()} • 
              {(document.file_size / 1024).toFixed(0)} KB
            </CardDescription>
          </div>
          <DocumentActions
            document={document}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <Badge className="text-xs">{document.category}</Badge>
          {document.tags && document.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-2">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {document.comments && (
            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{document.comments}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
