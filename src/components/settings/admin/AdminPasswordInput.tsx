import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AdminPasswordInput = ({ value, onChange, disabled }: AdminPasswordInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="admin-password" className="text-sm font-medium">
        Admin Password
      </Label>
      <Input
        id="admin-password"
        type="password"
        placeholder="Enter admin password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};