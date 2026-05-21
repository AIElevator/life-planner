import { z } from 'zod'

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.email('Please enter a valid email address').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export const LoginSchema = z.object({
  email: z.email('Please enter a valid email address').trim(),
  password: z.string().min(1, 'Password is required'),
})

export const MealLogSchema = z.object({
  date: z.string(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  mealName: z.string().min(1, 'Meal name is required').trim(),
  description: z.string().optional(),
  calories: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  memberIds: z.array(z.string()).optional(),
})

export const ExerciseLogSchema = z.object({
  date: z.string(),
  exerciseType: z.string().min(1, 'Exercise type is required').trim(),
  durationMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
  caloriesBurned: z.coerce.number().optional(),
  intensity: z.enum(['low', 'moderate', 'high']).optional(),
  notes: z.string().optional(),
})

export const FoodPreferenceSchema = z.object({
  foodName: z.string().min(1, 'Food name is required').trim(),
  preference: z.enum(['like', 'dislike', 'allergy']),
  notes: z.string().optional(),
})

export type FormState = {
  errors?: Record<string, string[]>
  message?: string
  success?: boolean
} | undefined
