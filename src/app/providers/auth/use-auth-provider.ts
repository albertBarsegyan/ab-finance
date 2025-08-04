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
import { auth, db } from '@/shared/config/firebase';
import type { SignUpProps } from './index';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';

export type MessageDataProps = {
  message: string | null;
  variant: 'success' | 'error';
};

type SignInProps = {
  email: string;
  password: string;
};

const MESSAGE_CLEAR_TIMEOUT_MS = 3000;

const DEFAULT_MESSAGE_DATA: MessageDataProps = {
  message: null,
  variant: 'error',
};

export function useAuthProviderContent() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [messageData, setMessageData] =
    useState<MessageDataProps>(DEFAULT_MESSAGE_DATA);

  const signUp = async ({
    email,
    password,
    fullname,
    country,
  }: SignUpProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;
      setUser(createdUser);

      // Update user profile with display name
      await updateProfile(createdUser, { displayName: fullname });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', createdUser.uid), {
        fullname,
        country,
        email,
        createdAt: serverTimestamp(),
      });

      setMessageData({
        message: 'User account created & signed in!',
        variant: 'success',
      });
    } catch (error: unknown) {
      setMessageData(handleFirebaseError(error));
    }
  };

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const userResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userResponse.user);
      setMessageData({
        message: 'Signed in successfully!',
        variant: 'success',
      });
    } catch (error: unknown) {
      console.log({ error });
      setMessageData(handleFirebaseError(error));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);

      setMessageData({
        message: 'Signed out successfully!',
        variant: 'success',
      });
    } catch (error: unknown) {
      setMessageData(handleFirebaseError(error));
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessageData({
        message: 'Password reset email sent. Please check your inbox.',
        variant: 'success',
      });
    } catch (error: unknown) {
      setMessageData(handleFirebaseError(error));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userData => {
      setUser(userData);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (messageData.message) {
      timeoutId = setTimeout(() => {
        setMessageData(DEFAULT_MESSAGE_DATA);
      }, MESSAGE_CLEAR_TIMEOUT_MS);

      console.log('timeoutId start', timeoutId);
    }

    return () => {
      if (timeoutId) {
        console.log('timeoutId end', timeoutId);
        clearTimeout(timeoutId);
      }
    };
  }, [messageData.message]);

  return {
    forgotPassword,
    user,
    initializing,
    signUp,
    signIn,
    signOut,
    messageData,
  };
}
