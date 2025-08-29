import { z } from 'zod';

export const addOutcomeSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number(val)), 'Amount must be a valid number')
    .refine(val => Number(val) > 0, 'Amount must be greater than 0'),
  note: z.string().optional(),
});

export type AddOutcomeFormData = z.infer<typeof addOutcomeSchema>;
