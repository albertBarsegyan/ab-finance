import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import {
  type Goal,
  useGoalsWithSelection,
} from '@/entities/goals/model/use-goals-with-selection';
import { useAuth } from '@/shared/hooks/auth';
import type { FirebaseError } from 'firebase/app';

interface GoalContextType {
  goals: Goal[];
  loading: boolean;
  error: FirebaseError | null;
  selectedGoal: Goal | null;
  setSelectedGoal: (goal: Goal | null) => void;
  selectedGoalId: string | null;
  addGoal: (
    goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'step'>
  ) => Promise<{ success: boolean; error?: string }>;
  updateGoal: (
    goalId: string,
    updates: Partial<
      Pick<
        Goal,
        | 'goal'
        | 'goalType'
        | 'goalPrice'
        | 'goalCurrency'
        | 'goalDuration'
        | 'note'
      >
    >
  ) => Promise<{ success: boolean; error?: string }>;
  deleteGoal: (goalId: string) => Promise<{ success: boolean; error?: string }>;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const goalsData = useGoalsWithSelection(user?.uid);

  return (
    <GoalContext.Provider value={goalsData}>{children}</GoalContext.Provider>
  );
}

export function useGoalSelection() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoalSelection must be used within a GoalProvider');
  }
  return context;
}
