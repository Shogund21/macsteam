import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PROJECT_PRIORITIES = [
  "High",
  "Medium",
  "Low",
] as const;

export const PrioritySelect = ({ value, onValueChange }: PrioritySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md z-50">
        {PROJECT_PRIORITIES.map((priority) => (
          <SelectItem 
            key={priority} 
            value={priority}
            className="cursor-pointer hover:bg-gray-100"
          >
            {priority}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};