import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from '@/app/providers/auth';
import { AlertProvider } from '@/app/providers/alert';
import { GlobalPopup } from '@/shared/components/global-popup';
import { AppRouter } from '@/app/routes';

import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AlertProvider>
        <AppRouter />
        <GlobalPopup />
      </AlertProvider>
    </AuthProvider>
  </StrictMode>
);
