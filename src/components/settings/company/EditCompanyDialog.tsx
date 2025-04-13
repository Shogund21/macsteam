
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CompanyForm } from "./CompanyForm";
import { Company } from "@/types/company";

interface EditCompanyDialogProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditCompanyDialog = ({
  company,
  isOpen,
  onClose,
  onSuccess
}: EditCompanyDialogProps) => {
  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
        </DialogHeader>
        {company && (
          <CompanyForm
            initialData={company}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
