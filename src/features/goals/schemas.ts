import { z } from 'zod';

export const addGoalSchema = z.object({
  goal: z
    .string()
    .min(1, 'Goal name is required')
    .min(2, 'Goal name must be at least 2 characters')
    .max(100, 'Goal name must be less than 100 characters')
    .trim(),
  goalPrice: z
    .string()
    .min(1, 'Goal price is required')
    .refine(val => !isNaN(Number(val)), 'Goal price must be a valid number')
    .refine(val => Number(val) > 0, 'Goal price must be greater than 0'),
  goalCurrency: z.string().min(1, 'Currency is required'),
});

export type AddGoalFormData = z.infer<typeof addGoalSchema>;

export const editGoalSchema = addGoalSchema;
export type EditGoalFormData = z.infer<typeof editGoalSchema>;
