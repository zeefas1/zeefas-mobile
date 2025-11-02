import React from 'react';
import { useBanner } from '@/contexts/BannerContext';
import ErrorBanner from './ErrorBanner';
import SuccessBanner from './SuccessBanner';

const GlobalBanners: React.FC = () => {
  const {
    errorBanner,
    successBanner,
    hideErrorBanner,
    hideSuccessBanner,
  } = useBanner();

  return (
    <>
      <ErrorBanner
        visible={errorBanner.visible}
        message={errorBanner.message}
        onDismiss={hideErrorBanner}
      />
      <SuccessBanner
        visible={successBanner.visible}
        message={successBanner.message}
        onDismiss={hideSuccessBanner}
      />
    </>
  );
};

export default GlobalBanners;