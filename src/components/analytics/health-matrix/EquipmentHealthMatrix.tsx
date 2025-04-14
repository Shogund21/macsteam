
import React, { useState } from "react";
import { useEquipmentHealthData, EquipmentHealthItem } from "./useEquipmentHealthData";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

const EquipmentHealthMatrix = () => {
  const { healthData, isLoading } = useEquipmentHealthData();
  const isMobile = useIsMobile();
  const [truncatedLocations, setTruncatedLocations] = useState<Record<string, boolean>>({});
  
  // Function to get risk emoji
  const getRiskEmoji = (level: EquipmentHealthItem["riskLevel"]) => {
    switch (level) {
      case "low": return "🟢";
      case "medium": return "🟠";
      case "high": return "🔴";
      default: return "⚪";
    }
  };
  
  // Function to get risk color class
  const getRiskColorClass = (level: EquipmentHealthItem["riskLevel"]) => {
    switch (level) {
      case "low": return "bg-green-100 text-green-700 border-green-300";
      case "medium": return "bg-orange-100 text-orange-700 border-orange-300";
      case "high": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };
  
  // Status Badge component
  const StatusBadge = ({ count, variant }: { count: number, variant: "default" | "secondary" | "destructive" | "outline" }) => (
    <Badge variant={variant} className="min-w-[36px] justify-center">
      {count}
    </Badge>
  );

  if (isLoading) {
    return (
      <div className="w-full space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <TooltipProvider>
        <Table className="min-w-[650px]">
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[200px]">Store Number</TableHead>
              <TableHead className="text-center">Operational</TableHead>
              <TableHead className="text-center">Needs Maintenance</TableHead>
              <TableHead className="text-center">Out of Service</TableHead>
              <TableHead className="text-center w-[120px]">Risk Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {healthData.map((item) => (
              <TableRow 
                key={item.location}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-medium">
                        {item.location}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="z-50">
                      <p>Store #{item.location}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                
                <TableCell className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-center">
                        <StatusBadge count={item.operational} variant="default" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.operational} operational equipment</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                
                <TableCell className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-center">
                        <StatusBadge count={item.needsMaintenance} variant="secondary" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.needsMaintenance} equipment needing maintenance</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                
                <TableCell className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-center">
                        <StatusBadge count={item.outOfService} variant="destructive" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.outOfService} equipment out of service</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm">{getRiskEmoji(item.riskLevel)}</span>
                        <Badge 
                          variant="outline" 
                          className={`${getRiskColorClass(item.riskLevel)} min-w-[50px] justify-center`}
                        >
                          {item.riskScore}%
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Health score: {item.riskScore}% of equipment operational</p>
                      <p>Total equipment: {item.total}</p>
                      <p>Store Number: {item.location}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {healthData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No equipment data available for any locations.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
};

export default EquipmentHealthMatrix;
