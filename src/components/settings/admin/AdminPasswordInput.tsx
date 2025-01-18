import { Input } from "@/components/ui/input";

interface AdminPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AdminPasswordInput = ({ value, onChange, disabled }: AdminPasswordInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="admin-password" className="text-sm font-medium">
        Admin Password
      </label>
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