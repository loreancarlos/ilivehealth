import { createContext, useState, ReactNode, useCallback } from "react";

interface AppContextType {
  showBackButton: boolean;
  setShowBackButton: (show: boolean) => void;
  showNotificationModal: boolean;
  setShowNotificationModal: (show: boolean) => void;
  showConnectionTrouble: boolean;
  setShowConnectionTrouble: (show: boolean) => void;

  showFilterModal: boolean;
  setShowFilterModal: (show: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (
    location: { latitude: number; longitude: number } | null
  ) => void;
}

export const AppContext = createContext<AppContextType>({
  showBackButton: false,
  setShowBackButton: () => {},
  showNotificationModal: false,
  setShowNotificationModal: () => {},
  showConnectionTrouble: false,
  setShowConnectionTrouble: () => {},
  showFilterModal: false,
  setShowFilterModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userLocation: null,
  setUserLocation: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] =
    useState<boolean>(false);
  const [showConnectionTrouble, setShowConnectionTrouble] =
    useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Memoized setters to prevent unnecessary re-renders
  const handleSetShowBackButton = useCallback((show: boolean) => {
    setShowBackButton(show);
  }, []);

  const handleSetShowNotificationModal = useCallback((show: boolean) => {
    setShowNotificationModal(show);
  }, []);

  const handleSetShowConnectionTrouble = useCallback((show: boolean) => {
    setShowConnectionTrouble(show);
  }, []);

  const handleSetShowFilterModal = useCallback((show: boolean) => {
    setShowFilterModal(show);
  }, []);

  const handleSetIsLoggedIn = useCallback((loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSetUserLocation = useCallback(
    (location: { latitude: number; longitude: number } | null) => {
      setUserLocation(location);
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        showBackButton,
        setShowBackButton: handleSetShowBackButton,
        showNotificationModal,
        setShowNotificationModal: handleSetShowNotificationModal,
        showConnectionTrouble,
        setShowConnectionTrouble: handleSetShowConnectionTrouble,
        showFilterModal,
        setShowFilterModal: handleSetShowFilterModal,
        isLoggedIn,
        setIsLoggedIn: handleSetIsLoggedIn,
        userLocation,
        setUserLocation: handleSetUserLocation,
      }}>
      {children}
    </AppContext.Provider>
  );
};
