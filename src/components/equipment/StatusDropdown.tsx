
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface StatusDropdownProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const isMobile = useIsMobile();
  const statuses = ["Operational", "Under Maintenance", "Offline", "Critical"];
  const [open, setOpen] = useState(false);

  const handleStatusChange = (status: string) => {
    onStatusChange(status);
    if (isMobile) {
      setTimeout(() => setOpen(false), 100);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-between">{status}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white shadow-md"
        sideOffset={isMobile ? 8 : 4}
        align={isMobile ? "center" : "end"}
        avoidCollisions={false}
      >
        {statuses.map((statusOption) => (
          <DropdownMenuItem
            key={statusOption}
            onClick={() => handleStatusChange(statusOption)}
            className="cursor-pointer hover:bg-gray-100"
          >
            {statusOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
