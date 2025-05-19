
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { ProjectForm } from "./ProjectForm";
import { useState } from "react";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  startdate: z.date().optional().nullable(),
  enddate: z.date().optional().nullable(),
  location: z.string().optional(),
});

interface EditProjectDialogProps {
  project: any;
  onEdit: (id: string, values: z.infer<typeof projectSchema>) => Promise<void>;
}

export const EditProjectDialog = ({ project, onEdit }: EditProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description || "",
      status: project.status,
      priority: project.priority,
      location: project.location || "",
      startdate: project.startdate ? new Date(project.startdate) : null,
      enddate: project.enddate ? new Date(project.enddate) : null,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          form={form}
          onSubmit={(values) => onEdit(project.id, values)}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};
