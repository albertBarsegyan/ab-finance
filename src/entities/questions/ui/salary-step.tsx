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
  salary: string;
  salaryCurrency: string;
  setSalaryCurrency: (newCurrency: string) => void;
  setSalary: (v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export function SalaryStep({
  salary,
  setSalary,
  onBack,
  onSubmit,
  disabled,
  isLoading,
  salaryCurrency,
  setSalaryCurrency,
}: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <CardHeader>
        <CardTitle>3. Write about your salary info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 mt-8">
            <div>
              <Label htmlFor="salary">Salary (only numbers)</Label>
              <Input
                id="salary"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder="Enter your salary..."
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={salaryCurrency}
              onChange={e => setSalaryCurrency(e.target.value)}
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
      <CardFooter className="flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={disabled || !salary}>
          {isLoading ? 'Saving...' : 'Submit'}
        </Button>
      </CardFooter>
    </form>
  );
}
