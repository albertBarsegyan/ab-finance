import { FirebaseError } from 'firebase/app';
import type { MessageDataProps } from '@/app/providers/auth/use-auth-provider.ts';

const firebaseErrorMap: Record<string, MessageDataProps> = {
  'auth/email-already-in-use': {
    message: 'That email address is already in use!',
    variant: 'error',
  },
  'auth/invalid-email': {
    message: 'That email address is invalid!',
    variant: 'error',
  },
  'auth/weak-password': {
    message: 'The password is too weak.',
    variant: 'error',
  },
  'auth/user-not-found': {
    message: 'User not found.',
    variant: 'error',
  },
  'auth/wrong-password': {
    message: 'Incorrect password.',
    variant: 'error',
  },
};

const fallbackMessage = 'An unexpected error occurred.';

export function handleFirebaseError(error: unknown): MessageDataProps {
  if (error instanceof FirebaseError) {
    const mapped = firebaseErrorMap[error.code];
    if (mapped) return mapped;
    return { message: error.message, variant: 'error' };
  }

  if (error instanceof Error) {
    return { message: error.message, variant: 'error' };
  }

  if (typeof error === 'string') {
    return { message: error, variant: 'error' };
  }

  return { message: fallbackMessage, variant: 'error' };
}
