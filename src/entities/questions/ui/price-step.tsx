import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';

const CURRENCIES = [
  { key: 'usd', label: '$ USD' },
  { key: 'eur', label: '€ EUR' },
  { key: 'gbp', label: '£ GBP' },
  { key: 'jpy', label: '¥ JPY' },
  { key: 'other', label: 'Other' },
];

type Props = {
  goalPrice: string;
  setGoalPrice: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
  otherCurrency: string;
  setOtherCurrency: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function PriceStep({
  goalPrice,
  setGoalPrice,
  currency,
  setCurrency,
  otherCurrency,
  setOtherCurrency,
  onNext,
  onBack,
}: Props) {
  return (
    <>
      <CardHeader>
        <CardTitle>2. What is your goal price?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="goal-price">Goal Price</Label>
            <Input
              id="goal-price"
              type="number"
              min="0"
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
              onChange={e => setCurrency(e.target.value)}
              className="mt-1 border rounded-md px-3 py-2 w-full bg-background"
            >
              {CURRENCIES.map(cur => (
                <option key={cur.key} value={cur.key}>
                  {cur.label}
                </option>
              ))}
            </select>
            {currency === 'other' && (
              <Input
                value={otherCurrency}
                onChange={e => setOtherCurrency(e.target.value)}
                placeholder="Enter currency..."
                className="mt-2"
                required
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={
            !goalPrice || (currency === 'other' && !otherCurrency.trim())
          }
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}
