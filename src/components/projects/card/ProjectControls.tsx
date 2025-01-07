import { StatusSelect } from "../StatusSelect";
import { PrioritySelect } from "../PrioritySelect";

interface ProjectControlsProps {
  status: string;
  priority: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export const ProjectControls = ({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: ProjectControlsProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Status:</span>
        <StatusSelect
          value={status}
          onValueChange={onStatusChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Priority:</span>
        <PrioritySelect
          value={priority}
          onValueChange={onPriorityChange}
        />
      </div>
    </>
  );
};