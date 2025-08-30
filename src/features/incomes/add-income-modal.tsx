import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useAuth } from '@/shared/hooks/auth';
import { useAlert } from '@/shared/hooks/alert';
import { useIncomes } from '@/entities/incomes/model/use-incomes';
import { useGoalSelection } from '@/app/providers/goal';
import { getCurrencySymbol } from '@/shared/lib/currency';
import { type AddIncomeFormData, addIncomeSchema } from './schemas';

export type AddIncomeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddIncomeModal({
  open,
  onOpenChange,
}: Readonly<AddIncomeModalProps>) {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const { selectedGoalId, selectedGoal } = useGoalSelection();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log({ selectedGoalId });
  const { addIncome } = useIncomes(user?.uid, selectedGoalId || undefined);

  // Get currency symbol from selected goal
  const currencySymbol = selectedGoal
    ? getCurrencySymbol(selectedGoal.goalCurrency)
    : '$';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddIncomeFormData>({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      amount: '',
      note: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: AddIncomeFormData) => {
    if (!user?.uid || !selectedGoalId) return;

    setIsSubmitting(true);

    const result = await addIncome({
      userId: user.uid,
      goalId: selectedGoalId,
      amount: Number(data.amount),
      note: data.note || '',
    });

    setAlert(result);

    setIsSubmitting(false);

    if (result.variant === 'success') {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          {selectedGoal && (
            <p className="text-sm text-muted-foreground">
              For goal: {selectedGoal.goal} ({currencySymbol})
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({currencySymbol})</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              className={errors.amount ? 'border-red-500' : ''}
              {...register('amount')}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="Add a note"
              className={errors.note ? 'border-red-500' : ''}
              {...register('note')}
            />
            {errors.note && (
              <p className="text-sm text-red-500">{errors.note.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Income'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
