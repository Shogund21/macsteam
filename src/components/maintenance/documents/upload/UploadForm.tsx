import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UploadFormProps {
  category: string;
  setCategory: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
  comments: string;
  setComments: (value: string) => void;
  onUpload: () => void;
  isUploading: boolean;
  hasFiles: boolean;
}

const UploadForm = ({
  category,
  setCategory,
  tags,
  setTags,
  comments,
  setComments,
  onUpload,
  isUploading,
  hasFiles,
}: UploadFormProps) => {
  return (
    <div className="space-y-4">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manual">Manual</SelectItem>
          <SelectItem value="service_record">Service Record</SelectItem>
          <SelectItem value="invoice">Invoice</SelectItem>
          <SelectItem value="inspection">Inspection Report</SelectItem>
          <SelectItem value="compliance">Compliance Document</SelectItem>
          <SelectItem value="warranty">Warranty</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <Textarea
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <Button
        onClick={onUpload}
        disabled={!hasFiles || isUploading}
        className="w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        {isUploading ? "Uploading..." : "Upload Documents"}
      </Button>
    </div>
  );
};

export default UploadForm;