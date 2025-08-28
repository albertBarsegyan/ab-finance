import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  FirestoreError,
} from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import type { AlertState } from '@/app/providers/alert';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';

export type Outcome = {
  id: string;
  userId: string;
  goalId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  // Other optional fields like amount, note, date can be added by caller
  [key: string]: unknown;
};

export type NewOutcome = Omit<Outcome, 'id' | 'createdAt' | 'updatedAt'>;

export function useOutcomes(userId: string | undefined, goalId?: string) {
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const baseRef = useMemo(
    () => collection(db, firestoreCollection.OUTCOMES),
    []
  );

  useEffect(() => {
    if (!userId) return;

    try {
      const constraints = [where('userId', '==', userId)];
      if (goalId) constraints.push(where('goalId', '==', goalId));

      // Use simple query without orderBy to avoid index issues
      const q = query(baseRef, ...constraints);

      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Outcome[];

          // Sort manually by createdAt
          items.sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
            return bTime - aTime;
          });

          setOutcomes(items);
          setLoading(false);
        },
        err => {
          console.error('Error fetching outcomes:', err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up outcomes query:', error);
      setError(error as FirestoreError);
      setLoading(false);
    }
  }, [userId, goalId, baseRef]);

  const addOutcome = useCallback(
    async (data: NewOutcome): Promise<AlertState> => {
      if (!data?.userId) {
        return {
          message: 'userId is required to add an outcome.',
          variant: 'destructive',
        };
      }

      if (!data?.goalId) {
        return {
          message: 'goalId is required to add an outcome.',
          variant: 'destructive',
        };
      }

      try {
        await addDoc(baseRef, {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return {
          message: 'Outcome saved successfully!',
          variant: 'success',
        };
      } catch (error: unknown) {
        return handleFirebaseError(error);
      }
    },
    [baseRef]
  );

  return { outcomes, loading, error, addOutcome };
}
