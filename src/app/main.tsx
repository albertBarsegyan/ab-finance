import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/app/providers/auth';
import { AlertProvider } from '@/app/providers/alert';
import { ModalProvider } from '@/app/providers/modal';
import { GoalProvider } from '@/app/providers/goal';
import { GlobalPopups } from '@/shared/components/global-popups';
import { AppRouter } from '@/app/routes';
import { ErrorBoundary } from '@/shared/components/error-boundary';
import { LanguageProvider } from '@/shared/lib/i18n/LanguageProvider';
import { PWAProvider } from '@/shared/components/custom/pwa-provider';

import '@/app/styles/index.css';
import '@/shared/lib/i18n';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ErrorBoundary>
    <PWAProvider>
      <LanguageProvider>
        <AuthProvider>
          <AlertProvider>
            <ModalProvider>
              <GoalProvider>
                <AppRouter />
                <GlobalPopups />
              </GoalProvider>
            </ModalProvider>
          </AlertProvider>
        </AuthProvider>
      </LanguageProvider>
    </PWAProvider>
  </ErrorBoundary>
  // </StrictMode>
);
