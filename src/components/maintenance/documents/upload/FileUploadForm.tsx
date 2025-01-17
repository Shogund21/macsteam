import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FileUploadFormProps {
  category: string;
  setCategory: (category: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  comments: string;
  setComments: (comments: string) => void;
  onUpload: () => void;
  isUploading: boolean;
  hasFiles: boolean;
}

const FileUploadForm = ({
  category,
  setCategory,
  tags,
  setTags,
  comments,
  setComments,
  onUpload,
  isUploading,
  hasFiles,
}: FileUploadFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="specifications">Specifications</SelectItem>
            <SelectItem value="drawings">Drawings</SelectItem>
            <SelectItem value="reports">Reports</SelectItem>
            <SelectItem value="manuals">Manuals</SelectItem>
            <SelectItem value="certifications">Certifications</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div>
        <Textarea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <Button
        onClick={onUpload}
        disabled={!hasFiles || !category || isUploading}
        className="w-full"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default FileUploadForm;