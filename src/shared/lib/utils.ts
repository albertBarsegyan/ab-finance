// src/shared/lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export function beautifyFirebaseMessage(message: string): string {
  if (!message) return 'An error occurred';

  // Remove Firebase prefix if present
  const cleanMessage = message.replace(/^Firebase: /, '');

  const errorMappings: Record<string, string> = {
    'auth/user-not-found': 'No account found with this email address',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'This email is already registered',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/too-many-requests':
      'Too many failed attempts. Please try again later',
    'auth/network-request-failed':
      'Network error. Please check your connection',
  };

  // Check if it's a known Firebase error code
  for (const [code, userMessage] of Object.entries(errorMappings)) {
    if (cleanMessage.includes(code)) {
      return userMessage;
    }
  }

  return cleanMessage;
}
