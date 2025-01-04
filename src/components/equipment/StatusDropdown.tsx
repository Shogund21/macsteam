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

const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const statusOptions = ["Working", "Offline"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full bg-white border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
        <span className={`w-2 h-2 rounded-full ${status === 'Working' ? 'bg-green-500' : 'bg-red-500'}`} />
        {status}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-white border rounded-md shadow-md min-w-[120px] z-50"
        sideOffset={5}
      >
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onStatusChange(option)}
            className={`cursor-pointer flex items-center gap-2 px-3 py-2 hover:bg-accent ${status === option ? 'bg-accent/50' : ''}`}
          >
            <span className={`w-2 h-2 rounded-full ${option === 'Working' ? 'bg-green-500' : 'bg-red-500'}`} />
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;