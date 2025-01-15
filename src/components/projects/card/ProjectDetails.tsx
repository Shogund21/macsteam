import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ProjectDetailsProps {
  description: string | null;
  location: string | null;
  startdate: string | null;
  enddate: string | null;
  onEditDescription?: () => void;
}

export const ProjectDetails = ({ 
  description, 
  location,
  startdate, 
  enddate,
  onEditDescription
}: ProjectDetailsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <p className="text-sm text-muted-foreground flex-grow">
          {description || "No description provided"}
        </p>
        {onEditDescription && (
          <Button variant="ghost" size="icon" onClick={onEditDescription}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Location:</span>
        <span className="text-sm">{location || "Not specified"}</span>
      </div>
      {startdate && (
        <div className="flex justify-between">
          <span className="text-sm font-medium">Start Date:</span>
          <span className="text-sm">
            {new Date(startdate).toLocaleDateString()}
          </span>
        </div>
      )}
      {enddate && (
        <div className="flex justify-between">
          <span className="text-sm font-medium">End Date:</span>
          <span className="text-sm">
            {new Date(enddate).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};