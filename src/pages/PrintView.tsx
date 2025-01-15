import Layout from "@/components/Layout";
import { PrintView as PrintViewComponent } from "@/components/print/PrintView";
import { useState, useEffect } from "react";
import PasswordProtectionModal from "@/components/equipment/PasswordProtectionModal";
import { useNavigate } from "react-router-dom";

const PrintView = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("printViewAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
    }
  }, []);

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordModal(false);
    sessionStorage.setItem("printViewAuth", "true");
  };

  const handlePasswordModalClose = () => {
    if (!isAuthenticated) {
      navigate("/");
    }
    setShowPasswordModal(false);
  };

  if (!isAuthenticated) {
    return (
      <PasswordProtectionModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSuccess={handlePasswordSuccess}
      />
    );
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 print:mb-2">Print View</h1>
        <PrintViewComponent />
      </div>
    </Layout>
  );
};

export default PrintView;