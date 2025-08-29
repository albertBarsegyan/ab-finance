import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';
import { currencies } from '@/shared/constants/currencies.ts';

type Props = {
  goalPrice: string;
  setGoalPrice: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export function PriceStep({
  goalPrice,
  setGoalPrice,
  currency,
  setCurrency,
  onBack,
  disabled,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <>
      <CardHeader>
        <CardTitle>3. What's your goal price?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="goal-price">Goal Price (only numbers)</Label>
            <Input
              id="goal-price"
              value={goalPrice}
              onChange={e => setGoalPrice(e.target.value)}
              placeholder="Enter amount..."
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={currency}
              onChange={e => {
                setCurrency(e.target.value);
              }}
              className="mt-1 border rounded-md px-3 py-2 w-full bg-background"
            >
              {currencies.map(cur => (
                <option key={cur.code} value={cur.code}>
                  {cur.code} ({cur.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onSubmit} disabled={disabled}>
          {isLoading ? 'Saving...' : 'Submit'}
        </Button>
      </CardFooter>
    </>
  );
}
