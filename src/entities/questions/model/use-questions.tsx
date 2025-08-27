import { useCallback, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import type { QuestionsState } from '@/entities/questions/model/questions-reducer.ts';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';
import type { AlertState } from '@/app/providers/alert';
import type { User } from 'firebase/auth';

export const useQuestions = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);

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
        questionsData.goalPrice &&
        questionsData.goalCurrency &&
        (questionsData.goalDuration.days > 0 ||
          questionsData.goalDuration.months > 0 ||
          questionsData.goalDuration.years > 0);

      if (!isComplete) {
        return {
          message: 'Please complete all questions before submitting.',
          variant: 'destructive',
        };
      }

      setIsLoading(true);

      try {
        const goalsRef = collection(
          db,
          firestoreCollection.USERS,
          user.uid,
          firestoreCollection.GOALS
        );

        await addDoc(goalsRef, {
          ...questionsData,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
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
          questionsData.goalPrice &&
          questionsData.goalCurrency &&
          (questionsData.goalDuration.days > 0 ||
            questionsData.goalDuration.months > 0 ||
            questionsData.goalDuration.years > 0)
      );
    },
    []
  );

  return {
    saveQuestions,
    isQuestionsComplete,
    isLoading,
  };
};
