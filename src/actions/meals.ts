'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { MealLogSchema, type FormState } from '@/lib/definitions'
import { startOfDay, endOfDay, subDays } from 'date-fns'

export async function logMeal(state: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAuth()

  const memberIds = formData.getAll('memberIds') as string[]

  const validated = MealLogSchema.safeParse({
    date: formData.get('date'),
    mealType: formData.get('mealType'),
    mealName: formData.get('mealName'),
    description: formData.get('description') || undefined,
    calories: formData.get('calories') || undefined,
    proteinG: formData.get('proteinG') || undefined,
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

export async function copyYesterdaysMeals(): Promise<void> {
  const session = await requireAuth()
  const today = new Date()
  const yesterday = subDays(today, 1)

  const yesterdayMeals = await prisma.mealLog.findMany({
    where: {
      userId: session.id,
      date: { gte: startOfDay(yesterday), lte: endOfDay(yesterday) },
    },
    include: { members: true },
  })

  if (yesterdayMeals.length === 0) return

  // Check we aren't duplicating — skip any meal type already logged today
  const todayMeals = await prisma.mealLog.findMany({
    where: {
      userId: session.id,
      date: { gte: startOfDay(today), lte: endOfDay(today) },
    },
    select: { mealType: true },
  })
  const todayTypes = new Set(todayMeals.map((m) => m.mealType))

  const toCreate = yesterdayMeals.filter((m) => !todayTypes.has(m.mealType))
  if (toCreate.length === 0) return

  for (const meal of toCreate) {
    await prisma.mealLog.create({
      data: {
        userId: session.id,
        date: startOfDay(today),
        mealType: meal.mealType,
        mealName: meal.mealName,
        description: meal.description,
        calories: meal.calories,
        proteinG: meal.proteinG,
        budget: meal.budget,
        notes: meal.notes,
        members: meal.members.length
          ? { connect: meal.members.map((m) => ({ id: m.id })) }
          : undefined,
      },
    })
  }

  revalidatePath('/dashboard')
  revalidatePath('/meals')
}
