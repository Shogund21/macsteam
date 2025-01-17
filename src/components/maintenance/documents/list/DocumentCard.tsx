import { Button } from "@/components/ui/button";
import { File, Download, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  file_name: string;
  file_path: string;
  category: string;
  uploaded_at: string;
  tags: string[];
  comments: string;
}

interface DocumentCardProps {
  document: Document;
  onDownload: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const DocumentCard = ({ document, onDownload, onDelete }: DocumentCardProps) => {
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
              onClick={() => onDownload(document)}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(document)}
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