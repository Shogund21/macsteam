import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface StatusDropdownProps {
  status: string;
  onStatusChange: (newStatus: string) => void;
}

const statusOptions = [
  "Operational",
  "Under Maintenance",
  "Out of Service",
  "Needs Attention",
];

const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 py-1 text-xs font-medium rounded-full bg-accent hover:bg-accent/80 transition-colors">
        {status}
        <ChevronDown className="ml-1 h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 bg-background">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onStatusChange(option)}
            className="cursor-pointer hover:bg-accent"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;