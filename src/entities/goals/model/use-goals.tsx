import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';

export interface Goal {
  id: string;
  goal: string;
  goalCurrency: string;
  goalPrice: string;
  step: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseUserGoalsResult {
  goals: Goal[];
  loading: boolean;
  error: FirestoreError | null;
  addGoal: (
    goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<{ success: boolean; error?: string }>;
  deleteGoal: (goalId: string) => Promise<{ success: boolean; error?: string }>;
}

export function useGoals(userId: string | undefined): UseUserGoalsResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!userId) return;

    try {
      const goalsRef = collection(
        db,
        firestoreCollection.USERS,
        userId,
        firestoreCollection.GOALS
      );

      // Use simple query without orderBy to avoid index issues
      const q = query(goalsRef);

      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const fetchedGoals = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Goal[];

          // Sort manually by createdAt
          fetchedGoals.sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
          });

          setGoals(fetchedGoals);
          setLoading(false);
        },
        err => {
          console.error('Error fetching goals:', err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up goals query:', error);
      setError(error as FirestoreError);
      setLoading(false);
    }
  }, [userId]);

  const addGoal = async (
    goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const goalsRef = collection(
        db,
        firestoreCollection.USERS,
        userId,
        firestoreCollection.GOALS
      );

      const newGoal = {
        ...goalData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(goalsRef, newGoal);
      return { success: true };
    } catch (error) {
      console.error('Error adding goal:', error);
      return { success: false, error: 'Failed to add goal' };
    }
  };

  const deleteGoal = async (
    goalId: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const goalRef = doc(
        db,
        firestoreCollection.USERS,
        userId,
        firestoreCollection.GOALS,
        goalId
      );

      await deleteDoc(goalRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting goal:', error);
      return { success: false, error: 'Failed to delete goal' };
    }
  };

  return { goals, loading, error, addGoal, deleteGoal };
}
