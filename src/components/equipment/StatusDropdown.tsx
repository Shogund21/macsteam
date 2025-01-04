import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusDropdownProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const statuses = ["Operational", "Under Maintenance", "Offline", "Critical"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-between">
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] bg-white">
        {statuses.map((statusOption) => (
          <DropdownMenuItem
            key={statusOption}
            onClick={() => onStatusChange(statusOption)}
            className="cursor-pointer"
          >
            {statusOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};