import React, { useEffect, useState } from 'react';
import { PWAUpdateNotification } from '../pwa-update-notification';
import { PWAInstallPrompt } from '../pwa-install-prompt';

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState<(() => Promise<void>) | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Dynamic import for virtual:pwa-register
      import('virtual:pwa-register').then(({ registerSW }) => {
        const { updateServiceWorker } = registerSW({
          onNeedRefresh() {
            setUpdateAvailable(true);
          },
          onOfflineReady() {
            setOfflineReady(true);
          },
        });

        setUpdateSW(() => updateServiceWorker);
      });
    }
  }, []);

  const handleUpdate = async () => {
    if (updateSW) {
      await updateSW();
      setUpdateAvailable(false);
    }
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
    setOfflineReady(false);
  };

  return (
    <>
      {children}
      <PWAInstallPrompt />
      {updateAvailable && (
        <PWAUpdateNotification
          onUpdate={handleUpdate}
          onDismiss={handleDismiss}
          isOfflineReady={false}
        />
      )}
      {offlineReady && (
        <PWAUpdateNotification
          onUpdate={handleUpdate}
          onDismiss={handleDismiss}
          isOfflineReady={true}
        />
      )}
    </>
  );
}
