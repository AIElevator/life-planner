'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { startOfWeek, endOfWeek } from 'date-fns'

export async function createDiaryShare(weekStart: Date, label?: string) {
  const session = await requireAuth()

  // Check if a share already exists for this week
  const existing = await prisma.diaryShare.findFirst({
    where: {
      userId: session.id,
      weekStart: startOfWeek(weekStart, { weekStartsOn: 1 }),
    },
  })

  if (existing) return { token: existing.token }

  const share = await prisma.diaryShare.create({
    data: {
      userId: session.id,
      weekStart: startOfWeek(weekStart, { weekStartsOn: 1 }),
      label: label ?? null,
    },
  })

  revalidatePath('/meals')
  return { token: share.token }
}

export async function deleteDiaryShare(token: string) {
  const session = await requireAuth()
  await prisma.diaryShare.delete({ where: { token, userId: session.id } })
  revalidatePath('/meals')
}
