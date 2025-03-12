
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
    <div className={`bg-gray-50 ${noPadding ? 'p-0' : isMobile ? 'p-4' : 'p-6'} rounded-lg border border-gray-100 shadow-sm`}>
      {title && (
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default FormSection;
