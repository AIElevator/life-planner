'use server'

import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function logWeighIn(formData: FormData): Promise<void> {
  const session = await requireAuth()

  const weightRaw = formData.get('weightKg') as string
  const notes = (formData.get('notes') as string)?.trim() || null
  const dateRaw = formData.get('date') as string

  const weightKg = parseFloat(weightRaw)
  if (isNaN(weightKg) || weightKg < 20 || weightKg > 400) return

  const date = dateRaw ? new Date(dateRaw) : new Date()

  await prisma.weighIn.create({
    data: {
      userId: session.id,
      date,
      weightKg,
      notes,
    },
  })

  revalidatePath('/progress')
  revalidatePath('/dashboard')
}

export async function deleteWeighIn(id: string) {
  const session = await requireAuth()
  await prisma.weighIn.delete({ where: { id, userId: session.id } })
  revalidatePath('/progress')
  revalidatePath('/dashboard')
}
