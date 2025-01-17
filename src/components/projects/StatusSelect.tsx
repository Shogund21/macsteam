import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PROJECT_STATUSES = [
  "Not Started",
  "In Progress",
  "On Hold",
  "Completed",
  "Cancelled",
] as const;

export const StatusSelect = ({ value, onValueChange }: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md z-50">
        {PROJECT_STATUSES.map((status) => (
          <SelectItem 
            key={status} 
            value={status}
            className="cursor-pointer hover:bg-gray-100"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};