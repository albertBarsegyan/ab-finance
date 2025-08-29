import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import {
  useGoalsWithSelection,
  type Goal,
} from '@/entities/goals/model/use-goals-with-selection';
import { useAuth } from '@/shared/hooks/auth';

interface GoalContextType {
  goals: Goal[];
  loading: boolean;
  error: any;
  selectedGoal: Goal | null;
  setSelectedGoal: (goal: Goal | null) => void;
  selectedGoalId: string | null;
  addGoal: (
    goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<{ success: boolean; error?: string }>;
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
