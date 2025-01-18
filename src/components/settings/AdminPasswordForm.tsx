import { Button } from "@/components/ui/button";
import { AdminPasswordInput } from "./admin/AdminPasswordInput";
import { useAdminPassword } from "@/hooks/use-admin-password";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AdminPasswordForm = () => {
  const {
    password,
    setPassword,
    isLoading,
    isAdmin,
    handleSubmit,
  } = useAdminPassword();

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <AdminPasswordInput
            value={password}
            onChange={setPassword}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      
      {isAdmin && (
        <Alert>
          <AlertDescription>
            You have admin privileges.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};