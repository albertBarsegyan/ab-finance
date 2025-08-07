export type QuestionsState = {
  step: number;
  goal: string;
  customGoal: string;
  goalPrice: string;
  currency: string;
  otherCurrency: string;
  salary: string;
};

export type QuestionsAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_GOAL'; goal: string }
  | { type: 'SET_CUSTOM_GOAL'; customGoal: string }
  | { type: 'SET_GOAL_PRICE'; goalPrice: string }
  | { type: 'SET_CURRENCY'; currency: string }
  | { type: 'SET_OTHER_CURRENCY'; otherCurrency: string }
  | { type: 'SET_SALARY'; salary: string }
  | { type: 'RESET' };

export const initialQuestionsState: QuestionsState = {
  step: 1,
  goal: '',
  customGoal: '',
  goalPrice: '',
  currency: 'usd',
  otherCurrency: '',
  salary: '',
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
        ...(action.goal !== 'custom' && action.goal !== 'other'
          ? { customGoal: '' }
          : {}),
      };
    case 'SET_CUSTOM_GOAL':
      return { ...state, customGoal: action.customGoal };
    case 'SET_GOAL_PRICE':
      return { ...state, goalPrice: action.goalPrice };
    case 'SET_CURRENCY':
      return { ...state, currency: action.currency };
    case 'SET_OTHER_CURRENCY':
      return { ...state, otherCurrency: action.otherCurrency };
    case 'SET_SALARY':
      return { ...state, salary: action.salary };
    case 'RESET':
      return { ...initialQuestionsState };
    default:
      return state;
  }
}
