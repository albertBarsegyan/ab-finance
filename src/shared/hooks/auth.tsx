import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth';

export const useAuth = () => useContext(AuthContext);
