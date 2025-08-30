import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GOAL_VARIANTS = [
  { key: 'emergency', labelKey: 'questions.emergencyFund' },
  { key: 'debt', labelKey: 'questions.payOffDebt' },
  { key: 'car', labelKey: 'questions.saveForCar' },
  { key: 'house', labelKey: 'questions.saveForHouse' },
  { key: 'education', labelKey: 'questions.education' },
  { key: 'wedding', labelKey: 'questions.wedding' },
  { key: 'travel', labelKey: 'questions.travel' },
  { key: 'retirement', labelKey: 'questions.retirement' },
  { key: 'health', labelKey: 'questions.health' },
  { key: 'business', labelKey: 'questions.business' },
  { key: 'child', labelKey: 'questions.child' },
  { key: 'investment', labelKey: 'questions.investment' },
];

type Props = {
  goal: string;
  setGoal: (g: string) => void;
  onNext: () => void;
};

export function GoalStep({ goal, setGoal, onNext }: Props) {
  const { t } = useTranslation();
  const [customGoal, setCustomGoal] = useState('');

  const handleGoalSelect = (key: string) => {
    setGoal(key);
    if (key !== 'other' && customGoal) setCustomGoal('');
  };

  return (
    <>
      <CardHeader>
        <CardTitle>
          {t('questions.step1')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {GOAL_VARIANTS.map(variant => (
            <Button
              key={variant.key}
              type="button"
              variant={goal === variant.key ? 'default' : 'secondary'}
              onClick={() => handleGoalSelect(variant.key)}
              className="w-full"
            >
              {t(variant.labelKey)}
            </Button>
          ))}

          <div className="mt-2">
            <Label htmlFor="custom-goal">{t('questions.otherGoal')}</Label>
            <Input
              id="custom-goal"
              value={customGoal}
              onChange={e => {
                setCustomGoal(e.target.value);
                setGoal(e.target.value);
              }}
              placeholder={t('questions.enterYourGoal')}
              className="mt-1"
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="ml-auto"
          onClick={onNext}
          disabled={!goal}
        >
          {t('common.next')}
        </Button>
      </CardFooter>
    </>
  );
}
