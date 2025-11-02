import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BannerState {
  visible: boolean;
  message: string;
}

interface BannerContextType {
  errorBanner: BannerState;
  successBanner: BannerState;
  showErrorBanner: (message: string) => void;
  showSuccessBanner: (message: string) => void;
  hideErrorBanner: () => void;
  hideSuccessBanner: () => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};

interface BannerProviderProps {
  children: ReactNode;
}

export const BannerProvider: React.FC<BannerProviderProps> = ({ children }) => {
  const [errorBanner, setErrorBanner] = useState<BannerState>({
    visible: false,
    message: '',
  });

  const [successBanner, setSuccessBanner] = useState<BannerState>({
    visible: false,
    message: '',
  });

  const showErrorBanner = (message: string) => {
    // Hide success banner if visible
    setSuccessBanner({ visible: false, message: '' });
    setErrorBanner({ visible: true, message });
  };

  const showSuccessBanner = (message: string) => {
    // Hide error banner if visible
    setErrorBanner({ visible: false, message: '' });
    setSuccessBanner({ visible: true, message });
  };

  const hideErrorBanner = () => {
    setErrorBanner({ visible: false, message: '' });
  };

  const hideSuccessBanner = () => {
    setSuccessBanner({ visible: false, message: '' });
  };

  return (
    <BannerContext.Provider
      value={{
        errorBanner,
        successBanner,
        showErrorBanner,
        showSuccessBanner,
        hideErrorBanner,
        hideSuccessBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};