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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/shared/hooks/auth';
import { useAlert } from '@/shared/hooks/alert';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes';
import { useGoalSelection } from '@/app/providers/goal';
import { getCurrencySymbol } from '@/shared/lib/currency';
import {
  type AddOutcomeFormData,
  addOutcomeSchema,
  outcomeTypes,
} from './schemas';

export type AddOutcomeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddOutcomeModal({
  open,
  onOpenChange,
}: Readonly<AddOutcomeModalProps>) {
  const { user } = useAuth();
  const { setAlert } = useAlert();
  const { selectedGoalId, selectedGoal } = useGoalSelection();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { addOutcome } = useOutcomes(user?.uid, selectedGoalId || undefined);

  // Get currency symbol from selected goal
  const currencySymbol = selectedGoal
    ? getCurrencySymbol(selectedGoal.goalCurrency)
    : '$';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<AddOutcomeFormData>({
    resolver: zodResolver(addOutcomeSchema),
    defaultValues: {
      amount: '',
      outcomeType: outcomeTypes[0],
      note: '',
    },
    mode: 'onChange',
  });

  const outcomeType = watch('outcomeType');

  const onSubmit = async (data: AddOutcomeFormData) => {
    if (!user?.uid || !selectedGoalId) return;

    setIsSubmitting(true);

    const result = await addOutcome({
      userId: user.uid,
      goalId: selectedGoalId,
      amount: data.amount,
      outcomeType: data.outcomeType,
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
          <DialogTitle>Add Outcome</DialogTitle>
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
              className={errors.amount ? 'border-red-500' : ''}
              {...register('amount')}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="outcomeType">Outcome Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {outcomeType}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto"
              >
                {outcomeTypes.map(type => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setValue('outcomeType', type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.outcomeType && (
              <p className="text-sm text-red-500">
                {errors.outcomeType.message}
              </p>
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
              {isSubmitting ? 'Saving...' : 'Save Outcome'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
