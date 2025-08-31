import { z } from 'zod';

export const incomeTypes = [
  '💰 Salary',
  '💼 Freelance',
  '🏢 Business Income',
  '📈 Investment Returns',
  '🏠 Rental Income',
  '🎁 Bonus',
  '💵 Commission',
  '💸 Tips',
  '🎁 Gift',
  '🏛️ Inheritance',
  '📄 Tax Refund',
  '⚡ Side Hustle',
  '🎯 Consulting',
  '👨‍🏫 Teaching',
  '✍️ Writing',
  '📸 Photography',
  '🛒 Online Sales',
  '📊 Dividends',
  '💹 Interest',
  '🔧 Other',
] as const;

export const addIncomeSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number(val)), 'Amount must be a valid number')
    .refine(val => Number(val) > 0, 'Amount must be greater than 0'),
  incomeType: z.string().min(1, 'Income type is required'),
  note: z.string().optional(),
});

export type AddIncomeFormData = z.infer<typeof addIncomeSchema>;
