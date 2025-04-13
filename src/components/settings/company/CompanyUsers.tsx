
import { useCompanyUsers } from "./users/useCompanyUsers";
import { AddUserForm } from "./users/AddUserForm";
import { UsersList } from "./users/UsersList";

interface CompanyUsersProps {
  companyId: string;
  companyName: string;
}

const CompanyUsers = ({ companyId, companyName }: CompanyUsersProps) => {
  const { users, loading, loadUsers } = useCompanyUsers(companyId);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Users for {companyName}</h3>
      
      <AddUserForm 
        companyId={companyId} 
        onSuccess={loadUsers} 
      />

      <UsersList 
        users={users} 
        loading={loading} 
        onRefresh={loadUsers} 
      />
    </div>
  );
};

export default CompanyUsers;
