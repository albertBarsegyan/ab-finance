import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';

const GOAL_VARIANTS = [
  { key: 'car', label: 'Car' },
  { key: 'house', label: 'House' },
  { key: 'travel', label: 'Travel' },
  { key: 'custom', label: 'Something from you' },
  { key: 'other', label: 'Other case' },
];

type Props = {
  goal: string;
  setGoal: (g: string) => void;
  customGoal: string;
  setCustomGoal: (g: string) => void;
  onNext: () => void;
};

export function GoalStep({
  goal,
  setGoal,
  customGoal,
  setCustomGoal,
  onNext,
}: Props) {
  const handleGoalSelect = (key: string) => {
    setGoal(key);
    if (key === 'custom' || key === 'other') {
      setCustomGoal('');
    }
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
              variant={goal === variant.key ? 'secondary' : 'outline'}
              onClick={() => handleGoalSelect(variant.key)}
              className="w-full"
            >
              {variant.label}
            </Button>
          ))}
          {(goal === 'custom' || goal === 'other') && (
            <div className="mt-2">
              <Label htmlFor="custom-goal">Describe your goal</Label>
              <Input
                id="custom-goal"
                value={customGoal}
                onChange={e => setCustomGoal(e.target.value)}
                placeholder="Enter your goal..."
                className="mt-1"
                required
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={onNext}
          disabled={
            !goal ||
            ((goal === 'custom' || goal === 'other') && !customGoal.trim())
          }
          className="ml-auto"
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}
