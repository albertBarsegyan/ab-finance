import { useReducer } from 'react';
import { QuestionsLayout } from '@/entities/questions/ui/layout.tsx';
import { GoalStep } from '@/entities/questions/ui/goal-step.tsx';
import { PriceStep } from '@/entities/questions/ui/price-step.tsx';
import { SalaryStep } from '@/entities/questions/ui/salary-step.tsx';
import {
  initialQuestionsState,
  questionsReducer,
} from '@/entities/questions/model/questions-reducer.ts';
import { useQuestions } from '@/entities/questions/model/use-questions.tsx';
import { useAlert } from '@/shared/hooks/alert';
import { useAuth } from '@/shared/hooks/auth';
import { appPath } from '@/shared/constants/app-path.ts';

export default function QuestionsPage() {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const [state, dispatch] = useReducer(questionsReducer, initialQuestionsState);
  const {
    saveQuestions,
    isQuestionsComplete,
    hasExistingAnswers,
    isLoading,
    isCheckingExisting,
    resetExistingAnswers,
    existingAnswers,
  } = useQuestions(user);

  if (isCheckingExisting) {
    return (
      <QuestionsLayout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <p className="text-muted-foreground">
            Checking if you have already answered questions...
          </p>
        </div>
      </QuestionsLayout>
    );
  }

  if (hasExistingAnswers) {
    return (
      <QuestionsLayout>
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Questions Already Answered
          </h2>
          <p className="text-muted-foreground mb-4">
            You have already completed the questions. Your answers have been
            saved.
          </p>
          {existingAnswers && (
            <div className="max-w-md mx-auto mb-6 p-4 bg-muted rounded-lg text-left">
              <h3 className="font-semibold mb-2">Your Previous Answers:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Goal:</strong>{' '}
                  {existingAnswers?.goal === 'custom'
                    ? existingAnswers?.customGoal
                    : existingAnswers?.goal}
                </p>
                <p>
                  <strong>Goal Price:</strong> {existingAnswers.goalPrice}{' '}
                  {existingAnswers && existingAnswers?.currency === 'other'
                    ? existingAnswers?.otherCurrency
                    : existingAnswers.currency?.toUpperCase()}
                </p>

                <p>
                  <strong>Salary:</strong> {existingAnswers.salary}
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <a
              href={appPath.MAIN_PATH}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => {
                resetExistingAnswers();
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
              Start Over
            </button>
          </div>
        </div>
      </QuestionsLayout>
    );
  }

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
          onSubmit={async () => {
            const result = await saveQuestions(state);
            if (result.variant === 'success') {
              dispatch({ type: 'RESET' });
            }
            setAlert(result);
          }}
          disabled={!isQuestionsComplete(state) || isLoading}
          isLoading={isLoading}
        />
      )}
    </QuestionsLayout>
  );
}
