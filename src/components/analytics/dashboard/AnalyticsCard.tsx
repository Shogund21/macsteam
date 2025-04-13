
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  description: string;
  tooltipContent: string;
  children: ReactNode;
  className?: string;
}

const AnalyticsCard = ({ 
  title, 
  description, 
  tooltipContent, 
  children,
  className = "" 
}: AnalyticsCardProps) => {
  return (
    <Card className={`overflow-hidden border shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
