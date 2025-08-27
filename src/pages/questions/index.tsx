import { useReducer } from 'react';
import { QuestionsLayout } from '@/entities/questions/ui/layout.tsx';
import { GoalStep } from '@/entities/questions/ui/goal-step.tsx';
import { DurationStep } from '@/entities/questions/ui/duration-step.tsx';
import {
  initialQuestionsState,
  questionsReducer,
} from '@/entities/questions/model/questions-reducer.ts';
import { useQuestions } from '@/entities/questions/model/use-questions.tsx';
import { useAlert } from '@/shared/hooks/alert';
import { useAuth } from '@/shared/hooks/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, firestoreCollection } from '@/shared/config/firebase.ts';
import { PriceStep } from '@/entities/questions/ui/price-step.tsx';

export default function QuestionsPage() {
  const { user, initializing, fetchUserDocument } = useAuth();
  const { setAlert } = useAlert();

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
        <DurationStep
          goalDuration={state.goalDuration}
          setGoalDuration={goalDuration =>
            dispatch({ type: 'SET_GOAL_DURATION', duration: goalDuration })
          }
          onNext={() => dispatch({ type: 'SET_STEP', step: 3 })}
          onBack={() => dispatch({ type: 'SET_STEP', step: 1 })}
        />
      )}

      {state.step === 3 && (
        <PriceStep
          goalPrice={state.goalPrice}
          setGoalPrice={goalPrice =>
            dispatch({ type: 'SET_GOAL_PRICE', goalPrice })
          }
          currency={state.goalCurrency}
          setCurrency={currency => {
            dispatch({ type: 'SET_GOAL_CURRENCY', currency });
          }}
          onSubmit={onSubmit}
          onBack={() => dispatch({ type: 'SET_STEP', step: 2 })}
          disabled={!isQuestionsComplete(state) || isLoading}
          isLoading={isLoading}
        />
      )}
    </QuestionsLayout>
  );
}
