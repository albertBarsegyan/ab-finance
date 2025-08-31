import { z } from 'zod';

const durationSchema = z
  .object({
    days: z.number().min(0, 'Days must be non-negative'),
    months: z.number().min(0, 'Months must be non-negative'),
    years: z.number().min(0, 'Years must be non-negative'),
  })
  .refine(
    duration => duration.days > 0 || duration.months > 0 || duration.years > 0,
    'At least one duration field must be greater than 0'
  );

export const goalTypes = [
  '🚨 Emergency Fund',
  '🏖️ Vacation',
  '🏠 Home Purchase',
  '🚗 Car Purchase',
  '🎓 Education',
  '💒 Wedding',
  '🏖️ Retirement',
  '💼 Business Investment',
  '💳 Debt Payoff',
  '🔨 Home Renovation',
  '🏥 Medical Expenses',
  '💻 Technology Upgrade',
  '✈️ Travel',
  '💪 Fitness & Health',
  '🎨 Hobby Equipment',
  '🎁 Gift Fund',
  '📊 Tax Savings',
  '🛡️ Insurance Premium',
  '❤️ Charity Donation',
  '📈 Investment Portfolio',
  '🔧 Other',
] as const;

export const addGoalSchema = z.object({
  goal: z
    .string()
    .min(1, 'Goal name is required')
    .min(2, 'Goal name must be at least 2 characters')
    .max(100, 'Goal name must be less than 100 characters')
    .trim(),
  goalType: z.string().min(1, 'Goal type is required'),
  goalPrice: z
    .string()
    .min(1, 'Goal price is required')
    .refine(val => !isNaN(Number(val)), 'Goal price must be a valid number')
    .refine(val => Number(val) > 0, 'Goal price must be greater than 0'),
  goalCurrency: z.string().min(1, 'Currency is required'),
  goalDuration: durationSchema,
  note: z.string().optional(),
});

export type AddGoalFormData = z.infer<typeof addGoalSchema>;

export const editGoalSchema = addGoalSchema;
export type EditGoalFormData = z.infer<typeof editGoalSchema>;
