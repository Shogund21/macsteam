import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintControlsProps {
  view: "equipment" | "projects";
  setView: (view: "equipment" | "projects") => void;
  onPrint: () => void;
}

export const PrintControls = ({ view, setView, onPrint }: PrintControlsProps) => {
  return (
    <div className="flex justify-between items-center print:hidden">
      <div className="space-x-4">
        <Button
          variant={view === "equipment" ? "default" : "outline"}
          onClick={() => setView("equipment")}
          className={view === "equipment" ? "bg-[#1EAEDB] text-black hover:bg-[#33C3F0]" : ""}
        >
          Equipment List
        </Button>
        <Button
          variant={view === "projects" ? "default" : "outline"}
          onClick={() => setView("projects")}
          className={view === "projects" ? "bg-[#1EAEDB] text-black hover:bg-[#33C3F0]" : ""}
        >
          Projects List
        </Button>
      </div>
      <Button 
        onClick={onPrint}
        className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  );
};