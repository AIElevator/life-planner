'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { MealLogSchema, type FormState } from '@/lib/definitions'

export async function logMeal(state: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAuth()

  const memberIds = formData.getAll('memberIds') as string[]

  const validated = MealLogSchema.safeParse({
    date: formData.get('date'),
    mealType: formData.get('mealType'),
    mealName: formData.get('mealName'),
    description: formData.get('description') || undefined,
    calories: formData.get('calories') || undefined,
    budget: formData.get('budget') || undefined,
    rating: formData.get('rating') || undefined,
    notes: formData.get('notes') || undefined,
    memberIds,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { memberIds: ids, ...data } = validated.data

  await prisma.mealLog.create({
    data: {
      ...data,
      date: new Date(data.date),
      userId: session.id,
      members: ids?.length ? { connect: ids.map(id => ({ id })) } : undefined,
    },
  })

  revalidatePath('/meals')
  revalidatePath('/dashboard')
  return { success: true, message: 'Meal logged successfully' }
}

export async function deleteMealLog(id: string) {
  const session = await requireAuth()
  await prisma.mealLog.delete({ where: { id, userId: session.id } })
  revalidatePath('/meals')
  revalidatePath('/dashboard')
}

export async function saveMealPlan(data: {
  date: string
  mealType: string
  mealName: string
  recipe?: string
  estimatedCost?: number
  memberIds: string[]
}) {
  const session = await requireAuth()

  await prisma.mealPlan.create({
    data: {
      userId: session.id,
      date: new Date(data.date),
      mealType: data.mealType,
      mealName: data.mealName,
      recipe: data.recipe,
      estimatedCost: data.estimatedCost,
      members: data.memberIds.length ? { connect: data.memberIds.map(id => ({ id })) } : undefined,
    },
  })

  revalidatePath('/meals')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function completeMealPlan(id: string) {
  const session = await requireAuth()
  await prisma.mealPlan.update({
    where: { id, userId: session.id },
    data: { isCompleted: true },
  })
  revalidatePath('/meals')
  revalidatePath('/dashboard')
}
