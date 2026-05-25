import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // Vercel automatically sends Authorization: Bearer <CRON_SECRET> for cron jobs
  const authHeader = request.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  // Find the start and end of today in UTC
  const now = new Date()
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0))
  const todayEnd   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59))

  // Load users who have WhatsApp configured
  const users = await prisma.user.findMany({
    where: {
      whatsappNumber: { not: null },
      whatsappApiKey: { not: null },
    },
    include: {
      mealLogs: {
        where: { date: { gte: todayStart, lte: todayEnd } },
        take: 1,
      },
    },
  })

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://life-planner-puqd1odcx-dave-hall-s-projects.vercel.app'

  let sent = 0
  let skipped = 0

  for (const user of users) {
    // Skip users who already logged food today
    if (user.mealLogs.length > 0) {
      skipped++
      continue
    }

    const firstName = user.name?.split(' ')[0] ?? 'there'
    const text = encodeURIComponent(
      `🍽️ Hey ${firstName}! Time to log today's meals in Life Planner — keeping your food diary up to date is the key to hitting your ManvFat goals this week. Log now 👉 ${appUrl}/meals?log=1`
    )

    const url = `https://api.callmebot.com/whatsapp.php?phone=${user.whatsappNumber}&text=${text}&apikey=${user.whatsappApiKey}`

    try {
      const res = await fetch(url)
      if (res.ok) {
        sent++
      } else {
        console.error(`CallMeBot error for ${user.whatsappNumber}: ${res.status}`)
      }
    } catch (err) {
      console.error(`Failed to send WhatsApp to ${user.whatsappNumber}:`, err)
    }
  }

  return NextResponse.json({ sent, skipped, total: users.length })
}
