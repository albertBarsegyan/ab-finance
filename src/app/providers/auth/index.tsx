import React, { createContext } from 'react';
import type { User } from 'firebase/auth';

import {
  useAuthProviderContent,
  type UserAdditional,
} from './use-auth-provider';
import type { AlertState } from '@/app/providers/alert';

type AuthContextType = {
  user: User | null;
  userAdditional: UserAdditional | null;
  initializing: boolean;
  signUp?: (props: SignUpProps) => Promise<AlertState>;
  signIn?: (props: SignInProps) => Promise<AlertState>;
  signOut?: () => Promise<AlertState>;
  forgotPassword: (email: string) => void;
  fetchUserDocument: (uid: string) => Promise<UserAdditional | null>;
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
  userAdditional: null,
  initializing: true,
  forgotPassword: () => {},
  fetchUserDocument: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthProviderContent();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
