import { FirebaseError } from 'firebase/app';
import type { AlertState } from '@/app/providers/alert';

const firebaseErrorMap: Record<string, AlertState> = {
  'auth/claims-too-large': {
    message: 'The custom claims payload exceeds the maximum allowed size.',
    variant: 'destructive',
  },
  'auth/email-already-exists': {
    message: 'The email address is already in use by another user.',
    variant: 'destructive',
  },
  'auth/id-token-expired': {
    message: 'The Firebase ID token has expired. Please sign in again.',
    variant: 'destructive',
  },
  'auth/id-token-revoked': {
    message: 'The Firebase ID token has been revoked. Please sign in again.',
    variant: 'destructive',
  },
  'auth/insufficient-permission': {
    message: 'Insufficient permissions to access this resource.',
    variant: 'destructive',
  },
  'auth/internal-error': {
    message: 'An internal authentication error occurred. Please try again.',
    variant: 'destructive',
  },
  'auth/invalid-argument': {
    message: 'Invalid argument provided for this authentication operation.',
    variant: 'destructive',
  },
  'auth/invalid-claims': {
    message: 'The provided custom claims are invalid.',
    variant: 'destructive',
  },
  'auth/invalid-continue-uri': {
    message: 'The continue URL is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-creation-time': {
    message: 'The creation time is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-credential': {
    message: 'The authentication credential is invalid for this operation.',
    variant: 'destructive',
  },
  'auth/invalid-disabled-field': {
    message: 'The disabled field value is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-display-name': {
    message: 'The display name must be a non-empty string.',
    variant: 'destructive',
  },
  'auth/invalid-dynamic-link-domain': {
    message: 'The dynamic link domain is not authorized for this project.',
    variant: 'destructive',
  },
  'auth/invalid-email': {
    message: 'The email address is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-email-verified': {
    message: 'The email verification status is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-algorithm': {
    message: 'The hash algorithm is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-block-size': {
    message: 'The hash block size is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-derived-key-length': {
    message: 'The hash derived key length is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-key': {
    message: 'The hash key is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-memory-cost': {
    message: 'The hash memory cost is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-parallelization': {
    message: 'The hash parallelization is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-rounds': {
    message: 'The hash rounds are invalid.',
    variant: 'destructive',
  },
  'auth/invalid-hash-salt-separator': {
    message: 'The hash salt separator is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-id-token': {
    message: 'The ID token is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-last-sign-in-time': {
    message: 'The last sign-in time is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-page-token': {
    message: 'The page token is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-password': {
    message: 'The password must be at least 6 characters.',
    variant: 'destructive',
  },
  'auth/invalid-password-hash': {
    message: 'The password hash is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-password-salt': {
    message: 'The password salt is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-phone-number': {
    message: 'The phone number is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-photo-url': {
    message: 'The photo URL is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-provider-data': {
    message: 'The provider data is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-provider-id': {
    message: 'The provider ID is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-oauth-responsetype': {
    message: 'Only one OAuth response type should be set.',
    variant: 'destructive',
  },
  'auth/invalid-session-cookie-duration': {
    message: 'The session cookie duration is invalid.',
    variant: 'destructive',
  },
  'auth/invalid-uid': {
    message: 'The UID must be a non-empty string with max 128 characters.',
    variant: 'destructive',
  },
  'auth/invalid-user-import': {
    message: 'The user import data is invalid.',
    variant: 'destructive',
  },
  'auth/maximum-user-count-exceeded': {
    message: 'Maximum number of users to import exceeded.',
    variant: 'destructive',
  },
  'auth/missing-android-pkg-name': {
    message: 'Android package name is required.',
    variant: 'destructive',
  },
  'auth/missing-continue-uri': {
    message: 'Continue URL is required.',
    variant: 'destructive',
  },
  'auth/missing-hash-algorithm': {
    message: 'Hash algorithm is required for password hashes.',
    variant: 'destructive',
  },
  'auth/missing-ios-bundle-id': {
    message: 'iOS bundle ID is required.',
    variant: 'destructive',
  },
  'auth/missing-uid': {
    message: 'UID is required for this operation.',
    variant: 'destructive',
  },
  'auth/missing-oauth-client-secret': {
    message: 'OAuth client secret is required.',
    variant: 'destructive',
  },
  'auth/operation-not-allowed': {
    message: 'This sign-in method is not enabled.',
    variant: 'destructive',
  },
  'auth/phone-number-already-exists': {
    message: 'The phone number is already in use.',
    variant: 'destructive',
  },
  'auth/project-not-found': {
    message: 'Firebase project not found.',
    variant: 'destructive',
  },
  'auth/reserved-claims': {
    message: 'Cannot use reserved claim keys for custom claims.',
    variant: 'destructive',
  },
  'auth/session-cookie-expired': {
    message: 'The session cookie has expired.',
    variant: 'destructive',
  },
  'auth/session-cookie-revoked': {
    message: 'The session cookie has been revoked.',
    variant: 'destructive',
  },
  'auth/too-many-requests': {
    message: 'Too many requests. Please try again later.',
    variant: 'destructive',
  },
  'auth/uid-already-exists': {
    message: 'The UID is already in use.',
    variant: 'destructive',
  },
  'auth/unauthorized-continue-uri': {
    message: 'The continue URL domain is not whitelisted.',
    variant: 'destructive',
  },
  'auth/user-not-found': {
    message: 'User not found.',
    variant: 'destructive',
  },
};

const fallbackMessage = 'An unexpected error occurred.';

export function handleFirebaseError(error: unknown): AlertState {
  if (error instanceof FirebaseError) {
    const mapped = firebaseErrorMap[error.code];

    console.log('error', error.code);
    if (mapped) return mapped;

    return { message: error.message, variant: 'destructive' };
  }

  if (error instanceof Error) {
    console.log('Error', { error });
    return { message: error.message, variant: 'destructive' };
  }

  if (typeof error === 'string') {
    return { message: error, variant: 'destructive' };
  }

  return { message: fallbackMessage, variant: 'destructive' };
}
