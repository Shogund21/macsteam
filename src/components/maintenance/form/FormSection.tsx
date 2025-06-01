
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormSectionProps {
  children: ReactNode;
  title?: string;
  noPadding?: boolean;
}

const FormSection = ({ children, title, noPadding }: FormSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`
        w-full 
        ${isMobile 
          ? 'mb-4 p-4 rounded-lg bg-white shadow-sm' 
          : 'bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm'
        }
        ${noPadding && !isMobile ? 'p-0' : ''}
      `}
      data-component="form-section"
    >
      {title && (
        <h3 className={`${isMobile ? 'text-lg mb-3' : 'text-xl mb-4'} font-semibold text-gray-800`}>
          {title}
        </h3>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
