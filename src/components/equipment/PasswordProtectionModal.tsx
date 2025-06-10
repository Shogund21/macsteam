
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PasswordProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordProtectionModal = ({
  isOpen,
  onClose,
  onSuccess,
}: PasswordProtectionModalProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mac2024") {
      onSuccess();
      setPassword("");
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "Please try again with the correct password.",
      });
      setPassword("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose} className="bg-blue-800 hover:bg-blue-900 text-white border-blue-800">
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordProtectionModal;
