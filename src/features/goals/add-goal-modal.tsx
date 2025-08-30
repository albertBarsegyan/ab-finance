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
import {
  type Duration,
  DurationPicker,
} from '@/shared/components/ui/duration-picker';
import { useAlert } from '@/shared/hooks/alert';
import { useAuth } from '@/shared/hooks/auth';
import { useGoalSelection } from '@/app/providers/goal';
import { currencies } from '@/shared/constants/currencies';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type AddGoalFormData, addGoalSchema } from './schemas';

export type AddGoalModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddGoalModal({
  open,
  onOpenChange,
}: Readonly<AddGoalModalProps>) {
  const { setAlert } = useAlert();
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addGoal } = useGoalSelection();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<AddGoalFormData>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      goal: '',
      goalPrice: '',
      goalCurrency: 'USD',
      goalDuration: {
        days: 0,
        months: 0,
        years: 0,
      },
    },
    mode: 'onChange',
  });

  console.log('watch', watch());

  const goalCurrency = watch('goalCurrency');
  const goalDuration = watch('goalDuration');

  const onSubmit = async (data: AddGoalFormData) => {
    if (!user?.uid) return;

    const result = await addGoal({
      goal: data.goal.trim(),
      goalPrice: data.goalPrice,
      goalCurrency: data.goalCurrency,
      goalDuration: data.goalDuration,
      userId: user.uid,
    });

    if (result.success) {
      setAlert({
        message: 'Goal created successfully!',
        variant: 'success',
      });
      reset();
      onOpenChange(false);
    } else {
      setAlert({
        message: result.error || 'Failed to create goal',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('goals.addNewGoal')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">{t('goals.goalName')}</Label>
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
            <Label htmlFor="goalPrice">{t('goals.targetAmount')}</Label>
            <Input
              id="goalPrice"
              type="number"
              placeholder="0"
              className={errors.goalPrice ? 'border-red-500' : ''}
              {...register('goalPrice')}
            />
            {errors.goalPrice && (
              <p className="text-sm text-red-500">{errors.goalPrice.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalCurrency">{t('goals.currency')}</Label>
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

          <div className="space-y-2">
            <DurationPicker
              value={goalDuration}
              onChange={(duration: Duration) =>
                setValue('goalDuration', duration)
              }
              error={errors.goalDuration?.message}
              label={t('goals.goalDuration')}
              description={t('goals.selectGoalDuration')}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? t('common.saving') : t('goals.addNewGoal')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
