import { useContext } from 'react';
import { AlertContext, type AlertContextType } from '@/app/providers/alert';

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
