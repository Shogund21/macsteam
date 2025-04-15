
import React, { useState, useEffect } from 'react';
import { PanelLeft } from 'lucide-react';

export const MobileHint = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the hint after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-4 z-40 flex items-center gap-2 rounded-lg bg-primary/90 px-3 py-2 text-sm text-white shadow-lg animate-fade-in">
      <PanelLeft className="h-4 w-4" />
      <span>Tap here to open menu</span>
    </div>
  );
};

export default MobileHint;
