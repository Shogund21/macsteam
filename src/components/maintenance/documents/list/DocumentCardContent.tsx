import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { MaintenanceDocument } from "@/types/document";

interface DocumentCardContentProps {
  doc: MaintenanceDocument;
}

export const DocumentCardContent = ({ doc }: DocumentCardContentProps) => {
  return (
    <CardContent>
      <div className="space-y-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {doc.category}
        </Badge>
        {doc.tags && doc.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {doc.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {doc.comments && (
          <p className="text-sm text-gray-600">{doc.comments}</p>
        )}
      </div>
    </CardContent>
  );
};