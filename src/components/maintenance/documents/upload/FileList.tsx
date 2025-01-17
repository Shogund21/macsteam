import { File } from "lucide-react";

interface FileListProps {
  files: FileList | null;
}

const FileList = ({ files }: FileListProps) => {
  if (!files) return null;

  return (
    <>
      {Array.from(files).map((file, index) => (
        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          <File className="h-4 w-4" />
          <span className="text-sm">{file.name}</span>
        </div>
      ))}
    </>
  );
};

export default FileList;