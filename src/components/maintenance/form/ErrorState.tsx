import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorStateProps {
  message?: string;
}

const ErrorState = ({ message = "Error loading form data" }: ErrorStateProps) => {
  return (
    <Alert variant="destructive">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorState;