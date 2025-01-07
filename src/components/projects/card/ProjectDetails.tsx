interface ProjectDetailsProps {
  description: string | null;
  location: string | null;
  startdate: string | null;
  enddate: string | null;
}

export const ProjectDetails = ({ 
  description, 
  location,
  startdate, 
  enddate 
}: ProjectDetailsProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        {description || "No description provided"}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Location:</span>
        <span className="text-sm font-semibold text-muted-foreground">
          {location || "Not specified"}
        </span>
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