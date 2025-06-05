
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

interface FormFieldGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  columns?: 1 | 2;
}

const FormFieldGroup = ({ 
  title, 
  description, 
  children, 
  columns = 1 
}: FormFieldGroupProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-3">
      {title && (
        <div className="border-l-4 border-blue-400 pl-4 py-2">
          <h4 className={`font-semibold text-gray-800 ${isMobile ? 'text-base' : 'text-lg'}`}>
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={`${
        isMobile || columns === 1 
          ? 'space-y-4' 
          : 'grid grid-cols-2 gap-4'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default FormFieldGroup;
