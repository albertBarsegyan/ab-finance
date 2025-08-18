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
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firestoreCollection } from '@/shared/config/firebase';
import type { SignUpProps } from './index';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';
import type { AlertState } from '@/app/providers/alert';

type SignInProps = {
  email: string;
  password: string;
};

export interface UserAdditional {
  isFirstTime: boolean;
}

export function useAuthProviderContent() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [userAdditional, setUserAdditional] = useState<UserAdditional | null>(
    null
  );

  const fetchUserAdditional = async (uid: string) => {
    try {
      const userDocRef = doc(db, firestoreCollection.USERS, uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as UserAdditional;
        setUserAdditional(userData);
        return userData;
      } else {
        setUserAdditional(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      setUserAdditional(null);
      return null;
    }
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpProps): Promise<AlertState> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const createdUser = userCredential.user;

      setUser(createdUser);

      const fullName = `${firstName} ${lastName}`;

      await updateProfile(createdUser, { displayName: fullName });

      const userData = {
        firstName,
        lastName,
        email,
        isFirstTime: true,
        createdAt: serverTimestamp(),
      };

      await setDoc(
        doc(db, firestoreCollection.USERS, createdUser.uid),
        userData
      );

      setUserAdditional({ isFirstTime: true });

      return {
        message: 'User account created & signed in!',
        variant: 'success',
      };
    } catch (error: unknown) {
      console.log({ error });
      return handleFirebaseError(error);
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

      if (userResponse.user.uid)
        await fetchUserAdditional(userResponse.user.uid);

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
      setUserAdditional(null);

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
    const unsubscribe = onAuthStateChanged(auth, async userData => {
      setUser(userData);

      if (userData?.uid) await fetchUserAdditional(userData.uid);

      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    forgotPassword,
    user,
    userAdditional,
    initializing,
    signUp,
    signIn,
    signOut,
    fetchUserDocument: fetchUserAdditional,
  };
}
