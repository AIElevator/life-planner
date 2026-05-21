'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { FoodPreferenceSchema, type FormState } from '@/lib/definitions'

export async function addFoodPreference(state: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAuth()

  const validated = FoodPreferenceSchema.safeParse({
    foodName: formData.get('foodName'),
    preference: formData.get('preference'),
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  await prisma.foodPreference.create({
    data: { ...validated.data, userId: session.id },
  })

  revalidatePath('/preferences')
  return { success: true }
}

export async function deleteFoodPreference(id: string) {
  const session = await requireAuth()
  await prisma.foodPreference.delete({ where: { id, userId: session.id } })
  revalidatePath('/preferences')
}
