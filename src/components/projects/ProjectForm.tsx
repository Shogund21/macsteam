import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ProjectBasicInfo } from "./form/ProjectBasicInfo";
import { ProjectStatusInfo } from "./form/ProjectStatusInfo";
import { ProjectDates } from "./form/ProjectDates";
import { FormActions } from "./form/FormActions";

interface ProjectFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  submitLabel: string;
}

export const ProjectForm = ({ form, onSubmit, submitLabel }: ProjectFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProjectBasicInfo form={form} />
        <ProjectStatusInfo form={form} />
        <ProjectDates form={form} />
        <FormActions />
      </form>
    </Form>
  );
};