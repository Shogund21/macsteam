import { File } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { MaintenanceDocument } from "@/types/document";

interface DocumentCardHeaderProps {
  doc: MaintenanceDocument;
}

export const DocumentCardHeader = ({ doc }: DocumentCardHeaderProps) => {
  return (
    <div>
      <CardTitle className="flex items-center gap-2">
        <File className="h-5 w-5" />
        {doc.file_name}
      </CardTitle>
      <CardDescription>
        Uploaded on {new Date(doc.uploaded_at).toLocaleDateString()}
      </CardDescription>
    </div>
  );
};