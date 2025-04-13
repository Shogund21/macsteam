
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CompanyUsers from "./CompanyUsers";
import { Company } from "@/types/company";

interface ManageUsersDialogProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ManageUsersDialog = ({
  company,
  isOpen,
  onClose
}: ManageUsersDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Manage Company Users</DialogTitle>
        </DialogHeader>
        {company && (
          <CompanyUsers companyId={company.id} companyName={company.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
