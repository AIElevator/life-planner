import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import twilio from 'twilio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken  = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM

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

  // Fetch users with WhatsApp numbers, including today's meal and exercise logs
  const users = await prisma.user.findMany({
    where: { whatsappNumber: { not: null } },
    include: {
      mealLogs: {
        where: { date: { gte: todayStart, lte: todayEnd } },
        take: 1,
      },
      exerciseLogs: {
        where: { date: { gte: todayStart, lte: todayEnd } },
        take: 1,
      },
    },
  })

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://life-planner-dave-hall-s-projects.vercel.app'

  let sent = 0
  let skipped = 0

  for (const user of users) {
    const noMeals    = user.mealLogs.length === 0
    const noExercise = user.exerciseLogs.length === 0

    // Nothing to nudge about — skip
    if (!noMeals && !noExercise) {
      skipped++
      continue
    }

    const firstName = user.name?.split(' ')[0] ?? 'there'

    let body: string

    if (noMeals && noExercise) {
      body = [
        `💪 Hey ${firstName}! Quick check-in — you haven't logged your meals or exercise today.`,
        ``,
        `🍽️ Log meals: ${appUrl}/meals?log=1`,
        `🏃 Log exercise: ${appUrl}/exercise`,
        ``,
        `Staying consistent is how you win your ManvFat weigh-in. You've got this!`,
      ].join('\n')
    } else if (noMeals) {
      body = [
        `🍽️ Hey ${firstName}! You've done your exercise today — nice work! Don't forget to log your meals too.`,
        ``,
        `Log now 👉 ${appUrl}/meals?log=1`,
        ``,
        `Keep the tracker complete for your Club Manager.`,
      ].join('\n')
    } else {
      // noExercise only
      body = [
        `🏃 Hey ${firstName}! Meals are logged — great stuff! Have you squeezed in any exercise today?`,
        ``,
        `Log it here 👉 ${appUrl}/exercise`,
        ``,
        `Even a 20-minute walk counts. Every bit helps at weigh-in!`,
      ].join('\n')
    }

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
