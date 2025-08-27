import { useEffect, useState } from 'react';
import {
  collection,
  FirestoreError,
  onSnapshot,
  orderBy,
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
}

export function useGoals(userId: string | undefined): UseUserGoalsResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!userId) return;

    const goalsRef = collection(
      db,
      firestoreCollection.USERS,
      userId,
      firestoreCollection.GOALS
    );

    const q = query(goalsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const fetchedGoals = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Goal[];

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
  }, [userId]);

  return { goals, loading, error };
}
