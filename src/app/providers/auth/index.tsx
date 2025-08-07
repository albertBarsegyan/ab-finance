import React, { createContext } from 'react';
import type { User } from 'firebase/auth';

import {
  type SignInResponse,
  useAuthProviderContent,
} from './use-auth-provider';
import type { AlertState } from '@/app/providers/alert';

type AuthContextType = {
  user: User | null;
  isSignInFirstTime: boolean;
  initializing: boolean;
  signUp?: (props: SignUpProps) => Promise<AlertState>;
  signIn?: (props: SignInProps) => Promise<SignInResponse>;
  signOut?: () => Promise<AlertState>;
  forgotPassword: (email: string) => void;
};

export type SignUpProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  forgotPassword: () => {},
  isSignInFirstTime: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthProviderContent();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
