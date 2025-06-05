
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
        w-full mobile-checklist-force-visible
        ${isMobile 
          ? 'mb-6 p-4 rounded-lg bg-white shadow-sm border border-gray-200' 
          : 'bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm'
        }
        ${noPadding && !isMobile ? 'p-0' : ''}
      `}
      data-component="form-section"
      data-force-visible="true"
      style={isMobile ? { 
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        minHeight: '50px',
        marginBottom: '1.5rem'
      } : {}}
    >
      {title && (
        <h3 className={`${isMobile ? 'text-lg mb-4 font-semibold' : 'text-xl mb-4'} font-semibold text-gray-800`}>
          {title}
        </h3>
      )}
      <div 
        className="w-full mobile-checklist-force-visible" 
        data-force-visible="true"
        style={isMobile ? {
          width: '100%',
          position: 'relative',
          overflow: 'visible'
        } : {}}
      >
        {children}
      </div>
    </div>
  );
};

export default FormSection;
