import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface Goal {
  id: string;
  goal: string;
  goalPrice: string;
  goalCurrency: string;
  step: number;
}

interface GoalContextType {
  selectedGoal: Goal | null;
  setSelectedGoal: (goal: Goal | null) => void;
  selectedGoalId: string | null;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const value = {
    selectedGoal,
    setSelectedGoal,
    selectedGoalId: selectedGoal?.id || null,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export function useGoalSelection() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoalSelection must be used within a GoalProvider');
  }
  return context;
}
