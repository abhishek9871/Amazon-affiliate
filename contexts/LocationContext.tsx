import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface LocationContextType {
  countryCode: string | null;
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextType>({
  countryCode: null,
  isLoading: true,
});

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        // Using a privacy-friendly IP to geo-location service
        const response = await fetch('https://ipapi.co/country_code/');
        if (!response.ok) {
          throw new Error('Failed to fetch country code');
        }
        const country = await response.text();
        // Fallback to 'US' if country is not found or empty
        setCountryCode(country.trim() || 'US');
      } catch (error) {
        console.error("Could not fetch user's country, defaulting to US.", error);
        setCountryCode('US'); // Default to US on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryCode();
  }, []);

  return (
    <LocationContext.Provider value={{ countryCode, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
