import React, { createContext } from 'react';
import type { User } from 'firebase/auth';

import { useAuthProviderContent } from './use-auth-provider';

type AuthContextType = {
  user: User | null;
  initializing: boolean;
  signUp: (props: SignUpProps) => void;
  signIn: (props: SignInProps) => void;
  signOut: () => void;
  forgotPassword: (email: string) => void;
  messageData: MessageDataProps;
};

export type SignUpProps = {
  email: string;
  password: string;
  fullname: string;
  country: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  forgotPassword: () => {},
  messageData: { message: null, variant: 'error' },
});

type MessageDataProps = {
  message: string | null;
  variant: 'success' | 'error';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthProviderContent();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
