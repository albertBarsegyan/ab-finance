import { useCallback, useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import type { QuestionsState } from '@/entities/questions/model/questions-reducer.ts';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';
import type { AlertState } from '@/app/providers/alert';
import type { User } from 'firebase/auth';

export const useQuestions = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingExisting, setIsCheckingExisting] = useState(false);
  const [existingAnswers, setExistingAnswers] = useState<QuestionsState | null>(
    null
  );

  const checkExistingAnswers = useCallback(async () => {
    if (!user?.uid) return;

    setIsCheckingExisting(true);

    try {
      const questionsRef = doc(db, firestoreCollection.QUESTIONS, user.uid);
      const docSnap = await getDoc(questionsRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setExistingAnswers(data as QuestionsState);
      } else setExistingAnswers(null);
    } catch (error) {
      console.error('Error checking existing answers:', error);
    } finally {
      setIsCheckingExisting(false);
    }
  }, [user?.uid]);

  const resetExistingAnswers = useCallback(() => {
    setExistingAnswers(null);
  }, []);

  useEffect(() => {
    if (user?.uid) void checkExistingAnswers();
  }, [user?.uid, checkExistingAnswers]);

  const saveQuestions = useCallback(
    async (questionsData: QuestionsState): Promise<AlertState> => {
      if (!user?.uid) {
        return {
          message:
            'User not authenticated. Please sign in to save your answers.',
          variant: 'destructive',
        };
      }

      const isComplete =
        questionsData.goal &&
        (questionsData.goal !== 'custom' || questionsData.customGoal) &&
        questionsData.goalPrice &&
        questionsData.currency &&
        (questionsData.currency !== 'other' || questionsData.otherCurrency) &&
        questionsData.salary;

      if (!isComplete) {
        return {
          message: 'Please complete all questions before submitting.',
          variant: 'destructive',
        };
      }

      setIsLoading(true);
      try {
        const questionsRef = doc(db, firestoreCollection.QUESTIONS, user.uid);

        await setDoc(questionsRef, {
          ...questionsData,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        await updateDoc(doc(db, firestoreCollection.USERS, user.uid), {
          isFirstTime: false,
        });

        return {
          message: 'Your answers have been saved successfully!',
          variant: 'success',
        };
      } catch (error: unknown) {
        console.error('Error saving questions:', error);
        return handleFirebaseError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [user?.uid]
  );

  const isQuestionsComplete = useCallback(
    (questionsData: QuestionsState): boolean => {
      return Boolean(
        questionsData.goal &&
          (questionsData.goal !== 'custom' || questionsData.customGoal) &&
          questionsData.goalPrice &&
          questionsData.currency &&
          (questionsData.currency !== 'other' || questionsData.otherCurrency) &&
          questionsData.salary
      );
    },
    []
  );

  return {
    saveQuestions,
    isQuestionsComplete,
    isLoading,
    isCheckingExisting,
    existingAnswers,
    resetExistingAnswers,
    checkExistingAnswers,
  };
};
