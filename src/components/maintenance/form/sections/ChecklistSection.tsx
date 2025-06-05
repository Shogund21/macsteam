
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChecklistSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  completed?: boolean;
  colorScheme?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const ChecklistSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = true,
  completed = false,
  colorScheme = 'blue'
}: ChecklistSectionProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    orange: 'border-orange-200 bg-orange-50',
    purple: 'border-purple-200 bg-purple-50',
    red: 'border-red-200 bg-red-50'
  };

  const headerColorClasses = {
    blue: 'text-blue-800 bg-blue-100',
    green: 'text-green-800 bg-green-100',
    orange: 'text-orange-800 bg-orange-100',
    purple: 'text-purple-800 bg-purple-100',
    red: 'text-red-800 bg-red-100'
  };

  return (
    <Card className={`w-full ${colorClasses[colorScheme]} border-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className={`cursor-pointer ${headerColorClasses[colorScheme]} ${isMobile ? 'p-4' : 'p-6'} rounded-t-lg`}>
            <CardTitle className={`flex items-center justify-between ${isMobile ? 'text-lg' : 'text-xl'}`}>
              <div className="flex items-center gap-3">
                {icon}
                <span>{title}</span>
                {completed && (
                  <span className="text-green-600 text-sm font-normal">
                    ✓ Complete
                  </span>
                )}
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'} pt-0`}>
            <div className="space-y-4">
              {children}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ChecklistSection;
