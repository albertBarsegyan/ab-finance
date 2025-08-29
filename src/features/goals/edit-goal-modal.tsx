import { useEffect, useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useAlert } from '@/shared/hooks/alert';
import { useGoalSelection } from '@/app/providers/goal';
import { currencies } from '@/shared/constants/currencies';
import { ChevronDown } from 'lucide-react';
import { type EditGoalFormData, editGoalSchema } from './schemas';

export type EditGoalModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId?: string;
};

export function EditGoalModal({
  open,
  onOpenChange,
  goalId,
}: Readonly<EditGoalModalProps>) {
  const { setAlert } = useAlert();
  const { goals, updateGoal, loading } = useGoalSelection();
  const goalToEdit = goalId ? goals.find(g => g.id === goalId) : null;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<EditGoalFormData>({
    resolver: zodResolver(editGoalSchema),
    defaultValues: {
      goal: goalToEdit?.goal || '',
      goalPrice: goalToEdit?.goalPrice || '',
      goalCurrency: goalToEdit?.goalCurrency || 'USD',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (goalToEdit && open) {
      reset({
        goal: goalToEdit.goal,
        goalPrice: goalToEdit.goalPrice,
        goalCurrency: goalToEdit.goalCurrency,
      });
    }
  }, [goalToEdit, open, reset]);

  useEffect(() => {
    if (goalToEdit) {
      setValue('goal', goalToEdit.goal);
      setValue('goalPrice', goalToEdit.goalPrice);
      setValue('goalCurrency', goalToEdit.goalCurrency);
    }
  }, [goalToEdit, setValue]);

  const goalCurrency = watch('goalCurrency');

  const onSubmit = async (data: EditGoalFormData) => {
    if (!goalToEdit?.id) return;
    setIsSubmitting(true);

    const result = await updateGoal(goalToEdit.id, {
      goal: data.goal.trim(),
      goalPrice: data.goalPrice,
      goalCurrency: data.goalCurrency,
    });

    if (result.success) {
      setAlert({ message: 'Goal updated successfully!', variant: 'success' });
      onOpenChange(false);
    } else {
      setAlert({
        message: result.error || 'Failed to update goal',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
        </DialogHeader>

        {loading || !goalToEdit ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading goal data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                placeholder="e.g., Buy a house, Save for vacation"
                className={errors.goal ? 'border-red-500' : ''}
                {...register('goal')}
              />
              {errors.goal && (
                <p className="text-sm text-red-500">{errors.goal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalPrice">Target Amount</Label>
              <Input
                id="goalPrice"
                type="number"
                placeholder="0"
                className={errors.goalPrice ? 'border-red-500' : ''}
                {...register('goalPrice')}
              />
              {errors.goalPrice && (
                <p className="text-sm text-red-500">
                  {errors.goalPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalCurrency">Currency</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {goalCurrency} -{' '}
                    {currencies.find(c => c.code === goalCurrency)?.name ||
                      'Select currency'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                  {currencies.map(currency => (
                    <DropdownMenuItem
                      key={currency.code}
                      onClick={() => setValue('goalCurrency', currency.code)}
                    >
                      {currency.code} - {currency.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {errors.goalCurrency && (
                <p className="text-sm text-red-500">
                  {errors.goalCurrency.message}
                </p>
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
