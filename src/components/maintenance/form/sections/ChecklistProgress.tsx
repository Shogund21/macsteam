
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChecklistProgressProps {
  sections: Array<{
    name: string;
    completed: boolean;
  }>;
}

const ChecklistProgress = ({ sections }: ChecklistProgressProps) => {
  const isMobile = useIsMobile();
  const completedCount = sections.filter(s => s.completed).length;
  const totalCount = sections.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${isMobile ? 'mb-4' : 'mb-6'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-gray-800 ${isMobile ? 'text-base' : 'text-lg'}`}>
          Checklist Progress
        </h3>
        <span className="text-sm text-gray-600">
          {completedCount} of {totalCount} completed
        </span>
      </div>
      
      <Progress value={progressPercentage} className="mb-3" />
      
      {isMobile ? (
        <div className="text-sm text-gray-600">
          {progressPercentage === 100 ? (
            <span className="text-green-600 font-medium">✓ All sections complete!</span>
          ) : (
            <span>{Math.round(progressPercentage)}% complete</span>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((section, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {section.completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className="h-4 w-4 text-gray-400" />
              )}
              <span className={section.completed ? 'text-green-700' : 'text-gray-600'}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistProgress;
