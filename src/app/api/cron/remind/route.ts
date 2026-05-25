import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'

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

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken  = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM // e.g. "whatsapp:+14155238886"

  if (!accountSid || !authToken || !fromNumber) {
    return NextResponse.json(
      { error: 'Twilio credentials not configured' },
      { status: 500 }
    )
  }

  const client = twilio(accountSid, authToken)

  // Start and end of today in UTC
  const now = new Date()
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const todayEnd   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59))

  // Users who have a WhatsApp number configured
  const users = await prisma.user.findMany({
    where: { whatsappNumber: { not: null } },
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
    // Skip users who've already logged food today
    if (user.mealLogs.length > 0) {
      skipped++
      continue
    }

    const firstName = user.name?.split(' ')[0] ?? 'there'
    const body =
      `🍽️ Hey ${firstName}! You haven't logged your meals today — a quick food diary keeps you on track for your ManvFat weigh-in. Log now 👉 ${appUrl}/meals?log=1`

    try {
      await client.messages.create({
        from: fromNumber,
        to:   `whatsapp:${user.whatsappNumber}`,
        body,
      })
      sent++
    } catch (err) {
      console.error(`Twilio send failed for ${user.whatsappNumber}:`, err)
    }
  }

  return NextResponse.json({ sent, skipped, total: users.length })
}
