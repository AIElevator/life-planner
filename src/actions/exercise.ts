'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ExerciseLogSchema, type FormState } from '@/lib/definitions'

export async function logExercise(state: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAuth()

  const validated = ExerciseLogSchema.safeParse({
    date: formData.get('date'),
    exerciseType: formData.get('exerciseType'),
    durationMinutes: formData.get('durationMinutes'),
    caloriesBurned: formData.get('caloriesBurned') || undefined,
    intensity: formData.get('intensity') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  await prisma.exerciseLog.create({
    data: {
      ...validated.data,
      date: new Date(validated.data.date),
      userId: session.id,
    },
  })

  revalidatePath('/exercise')
  revalidatePath('/dashboard')
  return { success: true, message: 'Exercise logged successfully' }
}

export async function deleteExerciseLog(id: string) {
  const session = await requireAuth()
  await prisma.exerciseLog.delete({ where: { id, userId: session.id } })
  revalidatePath('/exercise')
  revalidatePath('/dashboard')
}
