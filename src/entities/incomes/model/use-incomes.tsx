import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  FirestoreError,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import type { AlertState } from '@/app/providers/alert';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';

export type Income = {
  id: string;
  userId: string;
  goalId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  amount: number;
  incomeType: string;
  note: string;
};

export type NewIncome = Omit<Income, 'id' | 'createdAt' | 'updatedAt'>;

export function useIncomes(userId: string | undefined, goalId?: string) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const baseRef = useMemo(() => {
    if (!userId) return null;
    return collection(db, firestoreCollection.INCOMES);
  }, [userId]);
  console.log({ goalId });

  useEffect(() => {
    if (!userId || !baseRef) return;

    try {
      const constraints = [where('userId', '==', userId)];
      if (goalId) constraints.push(where('goalId', '==', goalId));

      // Use simple query without orderBy to avoid index issues
      const q =
        constraints.length > 0
          ? query(baseRef, ...constraints)
          : query(baseRef);

      const unsubscribe = onSnapshot(
        q,
        snapshot => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Income[];

          // Sort manually by createdAt
          items.sort((a, b) => {
            const aTime = a.createdAt
              ? new Date(a.createdAt as number).getTime()
              : 0;
            const bTime = b.createdAt
              ? new Date(b.createdAt as number).getTime()
              : 0;
            return bTime - aTime;
          });

          setIncomes(items);
          setLoading(false);
        },
        err => {
          console.error('Error fetching incomes:', err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up incomes query:', error);
      setError(error as FirestoreError);
      setLoading(false);
    }
  }, [userId, goalId, baseRef]);

  const addIncome = useCallback(
    async (data: NewIncome): Promise<AlertState> => {
      console.log({ data });
      if (!data?.userId) {
        return {
          message: 'userId is required to add an income.',
          variant: 'destructive',
        };
      }

      if (!data?.goalId) {
        return {
          message: 'goalId is required to add an income.',
          variant: 'destructive',
        };
      }

      if (!baseRef) {
        return {
          message: 'Collection reference not available.',
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
          message: 'Income saved successfully!',
          variant: 'success',
        };
      } catch (error: unknown) {
        console.log('error', error);
        return handleFirebaseError(error);
      }
    },
    [baseRef]
  );

  return { incomes, loading, error, addIncome };
}
