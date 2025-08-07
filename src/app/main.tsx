import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import App from './App.tsx';
import { AuthProvider } from '@/app/providers/auth';
import { AlertProvider } from '@/app/providers/alert';
import { GlobalPopup } from '@/shared/components/global-popup';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AlertProvider>
        <App />
        <GlobalPopup />
      </AlertProvider>
    </AuthProvider>
  </StrictMode>
);
