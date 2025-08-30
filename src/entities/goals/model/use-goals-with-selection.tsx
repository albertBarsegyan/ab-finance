import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';

export interface Goal {
  id: string;
  goal: string;
  goalCurrency: string;
  goalPrice: string;
  goalDuration?: {
    days: number;
    months: number;
    years: number;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UseGoalsWithSelectionResult {
  goals: Goal[];
  loading: boolean;
  error: FirestoreError | null;
  selectedGoal: Goal | null;
  selectedGoalId: string | null;
  setSelectedGoal: (goal: Goal | null) => void;
  addGoal: (
    goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<{ success: boolean; error?: string }>;
  updateGoal: (
    goalId: string,
    updates: Partial<
      Pick<Goal, 'goal' | 'goalPrice' | 'goalCurrency' | 'goalDuration'>
    >
  ) => Promise<{ success: boolean; error?: string }>;
  deleteGoal: (goalId: string) => Promise<{ success: boolean; error?: string }>;
}

const SELECTED_GOAL_STORAGE_KEY = 'selectedGoalId';

export function useGoalsWithSelection(
  userId: string | undefined
): UseGoalsWithSelectionResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [selectedGoal, setSelectedGoalState] = useState<Goal | null>(null);

  // Load selected goal from localStorage on mount
  useEffect(() => {
    const storedGoalId = localStorage.getItem(SELECTED_GOAL_STORAGE_KEY);
    if (storedGoalId && goals.length > 0) {
      const goal = goals.find(g => g.id === storedGoalId);
      if (goal) {
        setSelectedGoalState(goal);
      }
    }
  }, [goals]);

  // Set default selected goal when goals are loaded and no goal is selected
  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      const storedGoalId = localStorage.getItem(SELECTED_GOAL_STORAGE_KEY);

      if (storedGoalId) {
        // Try to find the stored goal
        const goal = goals.find(g => g.id === storedGoalId);
        if (goal) {
          setSelectedGoalState(goal);
        } else {
          // Stored goal not found, set first goal as default
          setSelectedGoalState(goals[0]);
          localStorage.setItem(SELECTED_GOAL_STORAGE_KEY, goals[0].id);
        }
      } else {
        // No stored goal, set first goal as default
        setSelectedGoalState(goals[0]);
        localStorage.setItem(SELECTED_GOAL_STORAGE_KEY, goals[0].id);
      }
    }
  }, [goals, selectedGoal]);

  // Fetch goals from Firestore
  useEffect(() => {
    if (!userId) return;

    try {
      const goalsRef = collection(
        db,
        firestoreCollection.USERS,
        userId,
        firestoreCollection.GOALS
      );

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

  // Set selected goal with localStorage persistence
  const setSelectedGoal = useCallback((goal: Goal | null) => {
    setSelectedGoalState(goal);

    if (typeof window !== 'undefined') {
      if (goal) {
        localStorage.setItem(SELECTED_GOAL_STORAGE_KEY, goal.id);
      } else {
        localStorage.removeItem(SELECTED_GOAL_STORAGE_KEY);
      }
    }
  }, []);

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

      const addedGoalRef = await addDoc(goalsRef, newGoal);
      const addedGoalSnap = await getDoc(addedGoalRef);

      if (addedGoalSnap.exists()) {
        const addedGoalData = {
          id: addedGoalSnap.id,
          ...addedGoalSnap.data(),
        } as Goal;

        setSelectedGoal(addedGoalData);
      }

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to add goal' };
    }
  };

  const updateGoal = async (
    goalId: string,
    updates: Partial<
      Pick<Goal, 'goal' | 'goalPrice' | 'goalCurrency' | 'goalDuration'>
    >
  ): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const goalRef = doc(
        db,
        firestoreCollection.USERS,
        userId,
        firestoreCollection.GOALS,
        goalId
      );

      await updateDoc(goalRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating goal:', error);
      return { success: false, error: 'Failed to update goal' };
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

      // If the deleted goal was selected, clear the selection
      if (selectedGoal?.id === goalId) {
        setSelectedGoal(null);
        localStorage.removeItem(SELECTED_GOAL_STORAGE_KEY);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting goal:', error);
      return { success: false, error: 'Failed to delete goal' };
    }
  };

  return {
    goals,
    loading,
    error,
    selectedGoal,
    selectedGoalId: selectedGoal?.id || null,
    setSelectedGoal,
    addGoal,
    updateGoal,
    deleteGoal,
  };
}
