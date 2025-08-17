import { Button } from '@/shared/components/ui/button.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card.tsx';

type Props = {
  salary: string;
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
}: Props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <CardHeader className="mb-4">
        <CardTitle>3. Write about your salary info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              placeholder="Enter your salary..."
              className="mt-1"
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
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
