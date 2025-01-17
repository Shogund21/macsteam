import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "positive" | "negative";
}

export const StatCard = ({
  name,
  value,
  icon: Icon,
  change,
  changeType,
}: StatCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {name}
          </p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#1EAEDB]" />
        </div>
      </div>
      <div className="mt-4">
        <span
          className={cn(
            "text-sm font-medium",
            changeType === "positive"
              ? "text-green-600"
              : "text-red-600"
          )}
        >
          {change}
        </span>
        <span className="text-sm text-muted-foreground ml-2">
          from last month
        </span>
      </div>
    </Card>
  );
};