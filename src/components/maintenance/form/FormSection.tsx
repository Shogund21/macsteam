
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormSectionProps {
  children: ReactNode;
}

const FormSection = ({ children }: FormSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`bg-gray-50 ${isMobile ? 'p-4' : 'p-6'} rounded-lg border border-gray-100 shadow-sm`}>
      {children}
    </div>
  );
};

export default FormSection;
