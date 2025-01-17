import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { MaintenanceFormValues } from "./hooks/useMaintenanceForm";

interface FormContainerProps {
  form: UseFormReturn<MaintenanceFormValues>;
  onSubmit: (values: MaintenanceFormValues) => void;
  children: React.ReactNode;
}

const FormContainer = ({ form, onSubmit, children }: FormContainerProps) => {
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {children}
      </form>
    </Form>
  );
};

export default FormContainer;