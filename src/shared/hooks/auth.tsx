import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth';
export type { UserAdditional } from '@/app/providers/auth/use-auth-provider';

export const useAuth = () => useContext(AuthContext);
