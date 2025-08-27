import { sanitizeNumeric } from '@/shared/lib/numeric.ts';

export type QuestionsState = {
  step: number;
  goal: string;
  goalPrice: string;
  goalCurrency: string;
  goalDuration: {
    days: number;
    months: number;
    years: number;
  };
};

export type QuestionsAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_GOAL'; goal: string }
  | { type: 'SET_GOAL_PRICE'; goalPrice: string }
  | { type: 'SET_GOAL_CURRENCY'; currency: string }
  | {
      type: 'SET_GOAL_DURATION';
      duration: { days: number; months: number; years: number };
    }
  | { type: 'RESET' };

export const initialQuestionsState: QuestionsState = {
  step: 1,
  goal: '',
  goalPrice: '',
  goalCurrency: 'USD',
  goalDuration: {
    days: 0,
    months: 0,
    years: 0,
  },
};

export function questionsReducer(
  state: QuestionsState,
  action: QuestionsAction
): QuestionsState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'SET_GOAL':
      return {
        ...state,
        goal: action.goal,
      };
    case 'SET_GOAL_PRICE':
      return {
        ...state,
        goalPrice: sanitizeNumeric(action.goalPrice),
      };
    case 'SET_GOAL_CURRENCY':
      return { ...state, goalCurrency: action.currency };
    case 'SET_GOAL_DURATION':
      return { ...state, goalDuration: action.duration };
    case 'RESET':
      return { ...initialQuestionsState };
    default:
      return state;
  }
}
