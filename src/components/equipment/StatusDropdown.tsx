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
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full bg-accent hover:bg-accent/80 transition-colors">
        <span className={`w-2 h-2 rounded-full ${status === 'Working' ? 'bg-green-500' : 'bg-red-500'}`} />
        {status}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onStatusChange(option)}
            className={`cursor-pointer ${status === option ? 'bg-accent' : ''}`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${option === 'Working' ? 'bg-green-500' : 'bg-red-500'}`} />
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;