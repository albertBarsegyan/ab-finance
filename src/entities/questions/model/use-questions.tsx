import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import type { QuestionsState } from '@/entities/questions/model/questions-reducer.ts';
import { handleFirebaseError } from '@/shared/utils/firebase.ts';
import type { AlertState } from '@/app/providers/alert';
import type { User } from 'firebase/auth';

export const useQuestions = (user: User | null) => {
  const [hasExistingAnswers, setHasExistingAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingExisting, setIsCheckingExisting] = useState(false);
  const [existingAnswers, setExistingAnswers] = useState<QuestionsState | null>(
    null
  );

  const checkExistingAnswers = useCallback(async () => {
    if (!user?.uid) return;

    setIsCheckingExisting(true);
    try {
      const questionsRef = doc(db, firestoreCollection.USERS, user.uid);

      const docSnap = await getDoc(questionsRef);

      if (docSnap.exists()) {
        setHasExistingAnswers(true);
        setExistingAnswers(docSnap.data() as QuestionsState);
      } else {
        setHasExistingAnswers(false);
        setExistingAnswers(null);
      }
    } catch (error) {
      console.error('Error checking existing answers:', error);
    } finally {
      setIsCheckingExisting(false);
    }
  }, [user?.uid]);

  const resetExistingAnswers = useCallback(() => {
    setHasExistingAnswers(false);
  }, []);

  const validateAndCleanData = useCallback((questionsData: QuestionsState) => {
    const cleanedData = { ...questionsData };

    if (cleanedData.goal === 'custom' && !cleanedData.customGoal) {
      cleanedData.customGoal = '';
    }

    if (cleanedData.currency === 'other' && !cleanedData.otherCurrency) {
      cleanedData.otherCurrency = '';
    }

    if (cleanedData.goalPrice) {
      cleanedData.goalPrice = cleanedData.goalPrice.trim();
    }

    if (cleanedData.salary) {
      cleanedData.salary = cleanedData.salary.trim();
    }

    return cleanedData;
  }, []);

  const saveQuestions = useCallback(
    async (questionsData: QuestionsState): Promise<AlertState> => {
      if (!user?.uid) {
        return {
          message:
            'User not authenticated. Please sign in to save your answers.',
          variant: 'destructive',
        };
      }

      // Check if all required questions are answered
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
        const cleanedData = validateAndCleanData(questionsData);
        const questionsRef = doc(
          db,
          firestoreCollection.USERS,
          user.uid,
          'questions',
          'user-preferences'
        );

        await setDoc(questionsRef, {
          ...cleanedData,
          userId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setHasExistingAnswers(true);
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
    [user?.uid, validateAndCleanData]
  );

  const isQuestionsComplete = useCallback(
    (questionsData: QuestionsState): boolean => {
      return !!(
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

  useEffect(() => {
    checkExistingAnswers();
  }, [checkExistingAnswers]);

  return {
    saveQuestions,
    isQuestionsComplete,
    hasExistingAnswers,
    isLoading,
    isCheckingExisting,
    checkExistingAnswers,
    validateAndCleanData,
    resetExistingAnswers,
    existingAnswers,
  };
};
