import { useReducer } from 'react';
import { QuestionsLayout } from '../../shared/components/pages/questions/layout';
import { GoalStep } from '../../shared/components/pages/questions/goal-step';
import { PriceStep } from '../../shared/components/pages/questions/price-step';
import { SalaryStep } from '../../shared/components/pages/questions/salary-step';
import {
  initialQuestionsState,
  questionsReducer,
} from '@/shared/components/pages/questions/questions-reducer';

export default function QuestionsPage() {
  const [state, dispatch] = useReducer(questionsReducer, initialQuestionsState);

  return (
    <QuestionsLayout>
      {state.step === 1 && (
        <GoalStep
          goal={state.goal}
          setGoal={goal => dispatch({ type: 'SET_GOAL', goal })}
          customGoal={state.customGoal}
          setCustomGoal={customGoal =>
            dispatch({ type: 'SET_CUSTOM_GOAL', customGoal })
          }
          onNext={() => dispatch({ type: 'SET_STEP', step: 2 })}
        />
      )}
      {state.step === 2 && (
        <PriceStep
          goalPrice={state.goalPrice}
          setGoalPrice={goalPrice =>
            dispatch({ type: 'SET_GOAL_PRICE', goalPrice })
          }
          currency={state.currency}
          setCurrency={currency => dispatch({ type: 'SET_CURRENCY', currency })}
          otherCurrency={state.otherCurrency}
          setOtherCurrency={otherCurrency =>
            dispatch({ type: 'SET_OTHER_CURRENCY', otherCurrency })
          }
          onNext={() => dispatch({ type: 'SET_STEP', step: 3 })}
          onBack={() => dispatch({ type: 'SET_STEP', step: 1 })}
        />
      )}
      {state.step === 3 && (
        <SalaryStep
          salary={state.salary}
          setSalary={salary => dispatch({ type: 'SET_SALARY', salary })}
          onBack={() => dispatch({ type: 'SET_STEP', step: 2 })}
          onSubmit={() => {
            dispatch({ type: 'RESET' });
            alert('Thank you! Your answers have been submitted.');
          }}
        />
      )}
    </QuestionsLayout>
  );
}
