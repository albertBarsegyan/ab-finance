import { z } from 'zod';

export const outcomeTypes = [
  '🛒 Groceries',
  '🏠 Rent/Mortgage',
  '⚡ Utilities',
  '🚗 Transportation',
  '🎬 Entertainment',
  '🍽️ Dining Out',
  '🏥 Healthcare',
  '🛡️ Insurance',
  '🎓 Education',
  '👕 Clothing',
  '💄 Personal Care',
  '🔨 Home Maintenance',
  '📱 Subscriptions',
  '✈️ Travel',
  '🎁 Gifts',
  '❤️ Charity',
  '💳 Debt Payment',
  '💰 Savings',
  '📈 Investment',
  '🔧 Other',
] as const;

export const addOutcomeSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number(val)), 'Amount must be a valid number')
    .refine(val => Number(val) > 0, 'Amount must be greater than 0'),
  outcomeType: z.string().min(1, 'Outcome type required'),
  note: z.string().optional(),
});

export type AddOutcomeFormData = z.infer<typeof addOutcomeSchema>;
