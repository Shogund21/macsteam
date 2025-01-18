import { ReactNode } from "react";

interface FormSectionProps {
  children: ReactNode;
}

const FormSection = ({ children }: FormSectionProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
      {children}
    </div>
  );
};

export default FormSection;