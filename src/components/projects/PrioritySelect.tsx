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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        {PROJECT_PRIORITIES.map((priority) => (
          <SelectItem key={priority} value={priority}>
            {priority}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};