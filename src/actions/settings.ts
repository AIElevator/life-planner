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
