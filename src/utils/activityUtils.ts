import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return CheckCircle2;
    case 'in progress':
      return Clock;
    default:
      return AlertTriangle;
  }
};

export const getMaintenanceIcon = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return CheckCircle2;
    case 'pending':
      return Clock;
    default:
      return AlertTriangle;
  }
};

export const formatTimestamp = (date: string | null): string => {
  if (!date) return "Unknown time";
  
  const now = new Date();
  const timestamp = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} days ago`;
  }
};

export const getOriginalDate = (formattedTime: string): Date => {
  const now = new Date();
  if (formattedTime.includes("minutes")) {
    const minutes = parseInt(formattedTime);
    return new Date(now.getTime() - minutes * 60000);
  } else if (formattedTime.includes("hours")) {
    const hours = parseInt(formattedTime);
    return new Date(now.getTime() - hours * 3600000);
  } else if (formattedTime.includes("days")) {
    const days = parseInt(formattedTime);
    return new Date(now.getTime() - days * 86400000);
  }
  return now;
};