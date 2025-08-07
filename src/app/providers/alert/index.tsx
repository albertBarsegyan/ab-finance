import { createContext, type ReactNode, useState } from 'react';

export type AlertVariant = 'destructive' | 'success' | 'default';

export interface AlertState {
  message: string | null;
  variant: AlertVariant;
}

export interface AlertContextType extends AlertState {
  setAlert: (data: AlertState) => void;
  clearAlert: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    message: null,
    variant: 'default',
  });

  const handleSetAlert = ({ message, variant = 'destructive' }: AlertState) => {
    setAlert({ message, variant });
  };

  const clearAlert = () => {
    setAlert({ message: null, variant: 'default' });
  };

  return (
    <AlertContext.Provider
      value={{
        message: alert.message,
        variant: alert.variant,
        setAlert: handleSetAlert,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
