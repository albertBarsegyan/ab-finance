import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firestoreCollection } from '@/shared/config/firebase';
import type { SignUpProps } from './index';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';
import type { AlertState } from '@/app/providers/alert';

type SignInProps = {
  email: string;
  password: string;
};

export interface SignupResponse {
  messageData: AlertState;
  isFirstTime: boolean;
}

export function useAuthProviderContent() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isSignInFirstTime, setIsSignInFirstTime] = useState<boolean>(false);

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpProps): Promise<SignupResponse> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const createdUser = userCredential.user;

      const isFirstTime =
        createdUser?.metadata?.creationTime ===
        createdUser?.metadata.lastSignInTime;
      console.log('isFirstTime', isFirstTime);
      setIsSignInFirstTime(isFirstTime);

      setUser(createdUser);

      const fullName = `${firstName} ${lastName}`;

      await updateProfile(createdUser, { displayName: fullName });

      await setDoc(doc(db, firestoreCollection.USERS, createdUser.uid), {
        firstName,
        lastName,
        email,
        createdAt: serverTimestamp(),
      });

      const messageData: AlertState = {
        message: 'User account created & signed in!',
        variant: 'success',
      };

      return {
        messageData,
        isFirstTime,
      };
    } catch (error: unknown) {
      console.log({ error });
      return { messageData: handleFirebaseError(error), isFirstTime: false };
    }
  };

  const signIn = async ({
    email,
    password,
  }: SignInProps): Promise<AlertState> => {
    try {
      const userResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userResponse.user);

      return {
        message: 'Signed in successfully!',
        variant: 'success',
      };
    } catch (error: unknown) {
      return handleFirebaseError(error);
    }
  };

  const signOut = async (): Promise<AlertState> => {
    try {
      await firebaseSignOut(auth);
      setUser(null);

      return {
        message: 'Signed out successfully!',
        variant: 'success',
      };
    } catch (error: unknown) {
      return handleFirebaseError(error);
    }
  };

  const forgotPassword = async (email: string): Promise<AlertState> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        message: 'Password reset email sent. Please check your inbox.',
        variant: 'success',
      };
    } catch (error: unknown) {
      return handleFirebaseError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userData => {
      setUser(userData);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    isSignInFirstTime,
    forgotPassword,
    user,
    initializing,
    signUp,
    signIn,
    signOut,
  };
}
