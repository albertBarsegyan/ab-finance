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

const GOAL_VARIANTS = [
  { key: 'emergency', label: '🛡️ Build an Emergency Fund' },
  { key: 'debt', label: '💳 Pay Off Debt' },
  { key: 'car', label: '🚗 Save for a Car' },
  { key: 'house', label: '🏡 Save for a House' },
  { key: 'education', label: '🎓 Education / Skill Development' },
  { key: 'wedding', label: '💍 Wedding Savings' },
  { key: 'travel', label: '✈️ Travel Fund' },
  { key: 'retirement', label: '🌅 Retirement Savings' },
  { key: 'health', label: '💊 Health & Medical Fund' },
  { key: 'business', label: '💼 Start a Business' },
  { key: 'child', label: '🧸 Child / Family Planning' },
  { key: 'investment', label: '📈 Investments & Wealth Growth' },
];

type Props = {
  goal: string;
  setGoal: (g: string) => void;
  onNext: () => void;
};

export function GoalStep({ goal, setGoal, onNext }: Props) {
  const [customGoal, setCustomGoal] = useState('');

  const handleGoalSelect = (key: string) => {
    setGoal(key);
    if (key !== 'other' && customGoal) setCustomGoal('');
  };

  return (
    <>
      <CardHeader>
        <CardTitle>
          1. Please tell about your goal, or choose one of them
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
              {variant.label}
            </Button>
          ))}

          <div className="mt-2">
            <Label htmlFor="custom-goal">Other goal</Label>
            <Input
              id="custom-goal"
              value={customGoal}
              onChange={e => {
                setCustomGoal(e.target.value);
                setGoal(e.target.value);
              }}
              placeholder="Enter your goal..."
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
          Next
        </Button>
      </CardFooter>
    </>
  );
}
