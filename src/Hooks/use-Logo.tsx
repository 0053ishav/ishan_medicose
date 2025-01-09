'use client'
import { useState, useEffect } from "react";

const useLogo = (newLogoUrl: string, logoTitle: string) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedLogo = localStorage.getItem(logoTitle);

    if (cachedLogo) {
      setLogoUrl(cachedLogo);
      setLoading(false);
      return;
    }

    if (newLogoUrl) {
      
      localStorage.setItem(logoTitle, newLogoUrl);
      setLogoUrl(newLogoUrl);
    } else {
      console.error(`Logo URL for ${logoTitle} not defined.`);
    }
    
    setLoading(false);
  }, [logoTitle, newLogoUrl]);

  return { logoUrl, loading };
};

export default useLogo;