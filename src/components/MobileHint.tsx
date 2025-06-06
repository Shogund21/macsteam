
import React, { useState, useEffect } from 'react';
import { PanelLeft } from 'lucide-react';

export const MobileHint = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen this hint before
    const hasSeenHint = localStorage.getItem('hasSeenSidebarHint');
    
    if (!hasSeenHint) {
      setIsVisible(true);
      
      // Hide the hint after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      
      // Store that user has seen the hint
      localStorage.setItem('hasSeenSidebarHint', 'true');
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-primary/90 px-3 py-2 text-sm text-white shadow-lg animate-fade-in">
      <PanelLeft className="h-4 w-4" />
      <span>Tap here to open menu</span>
    </div>
  );
};

export default MobileHint;
