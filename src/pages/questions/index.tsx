import { useEffect, useReducer } from 'react';
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
import { doc, updateDoc } from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import { useNavigate } from 'react-router-dom';
import { appPath } from '@/shared/constants/app-path.ts';

export default function QuestionsPage() {
  const { user, initializing, fetchUserDocument, userAdditional } = useAuth();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(questionsReducer, initialQuestionsState);

  const { saveQuestions, isQuestionsComplete, isLoading } = useQuestions(user);

  const onSubmit = async () => {
    const result = await saveQuestions(state);

    if (result.variant === 'success' && user?.uid) {
      dispatch({ type: 'RESET' });

      await updateDoc(doc(db, firestoreCollection.USERS, user.uid), {
        isFirstTime: false,
      });

      await fetchUserDocument(user?.uid);
    }
    setAlert(result);
  };

  useEffect(() => {
    if (userAdditional?.isFirstTime === false) navigate(appPath.MAIN_PATH);
  }, [navigate, userAdditional?.isFirstTime]);

  if (userAdditional?.isFirstTime === false) return null;

  if (initializing || isLoading) {
    return (
      <QuestionsLayout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <p className="text-muted-foreground">
            Please wait while we verify your authentication...
          </p>
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
          onNext={() => dispatch({ type: 'SET_STEP', step: 2 })}
        />
      )}
      {state.step === 2 && (
        <PriceStep
          goalPrice={state.goalPrice}
          setGoalPrice={goalPrice =>
            dispatch({ type: 'SET_GOAL_PRICE', goalPrice })
          }
          currency={state.goalCurrency}
          setCurrency={currency => {
            dispatch({ type: 'SET_GOAL_CURRENCY', currency });
          }}
          onNext={() => dispatch({ type: 'SET_STEP', step: 3 })}
          onBack={() => dispatch({ type: 'SET_STEP', step: 1 })}
        />
      )}
      {state.step === 3 && (
        <SalaryStep
          setSalaryCurrency={currency =>
            dispatch({ type: 'SET_SALARY_CURRENCY', currency })
          }
          salaryCurrency={state.salaryCurrency}
          salary={state.salaryPrice}
          setSalary={salary => dispatch({ type: 'SET_SALARY', salary })}
          onBack={() => dispatch({ type: 'SET_STEP', step: 2 })}
          onSubmit={onSubmit}
          disabled={!isQuestionsComplete(state) || isLoading}
          isLoading={isLoading}
        />
      )}
    </QuestionsLayout>
  );
}
