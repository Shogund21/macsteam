import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordProtectionModal from "./PasswordProtectionModal";

interface EquipmentAuthProps {
  children: React.ReactNode;
}

export const EquipmentAuth = ({ children }: EquipmentAuthProps) => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const wasAuthenticated = sessionStorage.getItem("equipment-authenticated");
    if (wasAuthenticated === "true") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
    }
  }, []);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordModal(false);
    sessionStorage.setItem("equipment-authenticated", "true");
  };

  if (!isAuthenticated) {
    return (
      <PasswordProtectionModal
        isOpen={showPasswordModal}
        onClose={() => navigate("/")}
        onSuccess={handlePasswordSuccess}
      />
    );
  }

  return <>{children}</>;
};