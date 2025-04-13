
import { Button } from "@/components/ui/button";

interface TablePlaceholderProps {
  onShowCharts: () => void;
}

const TablePlaceholder = ({ onShowCharts }: TablePlaceholderProps) => {
  return (
    <div className="flex items-center justify-center p-12 bg-white rounded-lg border shadow-sm">
      <div className="text-center">
        <p className="text-muted-foreground">Table view will be implemented in a future update.</p>
        <Button 
          variant="outline" 
          onClick={onShowCharts} 
          className="mt-4"
        >
          Return to Charts
        </Button>
      </div>
    </div>
  );
};

export default TablePlaceholder;
