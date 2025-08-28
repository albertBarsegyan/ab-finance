import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/app/providers/auth';
import { AlertProvider } from '@/app/providers/alert';
import { ModalProvider } from '@/app/providers/modal';
import { GoalProvider } from '@/app/providers/goal';
import { GlobalPopups } from '@/shared/components/global-popups';
import { AppRouter } from '@/app/routes';

import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>
);
