
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
    <div className={`
      ${isMobile ? 'mb-6 p-4 rounded-lg bg-white shadow-sm' : 'bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm'}
      ${noPadding && !isMobile ? 'p-0' : ''}
    `}>
      {title && (
        <h3 className={`${isMobile ? 'text-lg mb-3' : 'text-xl mb-4'} font-semibold`}>
          {title}
        </h3>
      )}
      <div className={isMobile ? 'space-y-4' : ''}>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
