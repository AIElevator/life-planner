'use server'

import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveWhatsappSettings(formData: FormData) {
  const session = await requireAuth()
  const number = (formData.get('whatsappNumber') as string)
    ?.trim()
    .replace(/\s+/g, '')
    .replace(/^\+/, '') // strip leading + if user adds it

  await prisma.user.update({
    where: { id: session.id },
    data: { whatsappNumber: number || null },
  })

  revalidatePath('/settings')
}

export async function saveGoals(formData: FormData) {
  const session = await requireAuth()

  const calories = parseInt(formData.get('dailyCalorieTarget') as string)
  const protein = parseInt(formData.get('dailyProteinTarget') as string)
  const weighInDay = (formData.get('weighInDay') as string) || null
  const matchDayRaw = formData.get('matchDayOfWeek') as string
  const matchDay = matchDayRaw !== '' ? parseInt(matchDayRaw) : null

  await prisma.user.update({
    where: { id: session.id },
    data: {
      dailyCalorieTarget: isNaN(calories) ? 2000 : Math.max(1000, Math.min(5000, calories)),
      dailyProteinTarget: isNaN(protein) ? 150 : Math.max(50, Math.min(400, protein)),
      weighInDay: weighInDay || null,
      matchDayOfWeek: matchDay !== null && !isNaN(matchDay) ? matchDay : null,
    },
  })

  revalidatePath('/settings')
  revalidatePath('/dashboard')
}
