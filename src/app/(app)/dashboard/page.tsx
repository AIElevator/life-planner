import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatCurrency, getMealTypeLabel } from '@/lib/utils'
import { format, startOfDay, endOfDay, subDays } from 'date-fns'
import {
  UtensilsCrossed,
  Dumbbell,
  Flame,
  TrendingUp,
  ChevronRight,
  Plus,
  Sparkles,
  Activity,
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await requireAuth()
  const today = new Date()

  const [todayMeals, todayExercise, recentExercise, weeklyStats] = await Promise.all([
    prisma.mealLog.findMany({
      where: { userId: session.id, date: { gte: startOfDay(today), lte: endOfDay(today) } },
      include: { members: true },
      orderBy: { date: 'asc' },
    }),
    prisma.exerciseLog.findMany({
      where: { userId: session.id, date: { gte: startOfDay(today), lte: endOfDay(today) } },
      orderBy: { date: 'asc' },
    }),
    prisma.exerciseLog.findMany({
      where: { userId: session.id, date: { gte: subDays(today, 7) } },
      orderBy: { date: 'desc' },
    }),
    prisma.mealLog.aggregate({
      where: { userId: session.id, date: { gte: subDays(today, 7) } },
      _sum: { calories: true, budget: true },
      _count: true,
    }),
  ])

  const totalCaloriesToday = todayMeals.reduce((sum: number, m) => sum + (m.calories ?? 0), 0)
  const totalExerciseMinutes = todayExercise.reduce((sum: number, e) => sum + e.durationMinutes, 0)
  const weeklyCaloriesBurned = recentExercise.reduce((sum: number, e) => sum + (e.caloriesBurned ?? 0), 0)

  const hour = today.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = session.name?.split(' ')[0] ?? 'there'

  const stats = [
    {
      label: 'Meals today',
      value: String(todayMeals.length),
      sub: todayMeals.length === 0
        ? 'Nothing logged yet'
        : totalCaloriesToday > 0
          ? `${totalCaloriesToday} kcal`
          : 'No calories tracked',
      icon: UtensilsCrossed,
      iconBg: 'bg-emerald-500',
      iconShadow: 'shadow-emerald-200/70',
      cardBorder: 'hover:border-emerald-100',
      valueCls: 'text-gray-900',
    },
    {
      label: 'Exercise today',
      value: totalExerciseMinutes > 0 ? `${totalExerciseMinutes}m` : '—',
      sub: todayExercise.length > 0
        ? `${todayExercise.length} session${todayExercise.length > 1 ? 's' : ''}`
        : 'Rest day',
      icon: Dumbbell,
      iconBg: 'bg-blue-500',
      iconShadow: 'shadow-blue-200/70',
      cardBorder: 'hover:border-blue-100',
      valueCls: 'text-gray-900',
    },
    {
      label: 'Calories burned',
      value: weeklyCaloriesBurned > 0 ? weeklyCaloriesBurned.toLocaleString() : '—',
      sub: 'Last 7 days',
      icon: Flame,
      iconBg: 'bg-orange-500',
      iconShadow: 'shadow-orange-200/70',
      cardBorder: 'hover:border-orange-100',
      valueCls: 'text-gray-900',
    },
    {
      label: 'Meals this week',
      value: String(weeklyStats._count),
      sub: weeklyStats._sum.budget
        ? `${formatCurrency(weeklyStats._sum.budget)} spent`
        : 'No budget tracked',
      icon: TrendingUp,
      iconBg: 'bg-violet-500',
      iconShadow: 'shadow-violet-200/70',
      cardBorder: 'hover:border-violet-100',
      valueCls: 'text-gray-900',
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-1.5">
            {format(today, 'EEEE, d MMMM yyyy')}
          </p>
          <h1 className="text-[2rem] font-bold leading-tight text-gray-900 tracking-tight">
            {greeting}, {firstName}
          </h1>
          <p className="text-gray-400 mt-1.5 text-sm">
            Here&apos;s your health overview for today.
          </p>
        </div>

        <Link
          href="/meals?suggest=1"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/70 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          Suggest dinner
        </Link>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, iconBg, iconShadow, cardBorder }) => (
          <div
            key={label}
            className={`group relative bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${cardBorder} overflow-hidden`}
          >
            {/* Faint top-right glow */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div
              className={`relative w-10 h-10 rounded-xl ${iconBg} shadow-md ${iconShadow} flex items-center justify-center mb-4`}
            >
              <Icon className="h-4.5 w-4.5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 leading-none tracking-tight">{value}</p>
            <p className="text-xs font-semibold text-gray-500 mt-1.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Today panels ──────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* Meals panel */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 shadow-sm shadow-emerald-200/60">
                <UtensilsCrossed className="h-3.5 w-3.5 text-white" />
              </span>
              <h2 className="font-semibold text-gray-900 text-sm">Today&apos;s meals</h2>
            </div>
            <Link
              href="/meals"
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {todayMeals.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 space-y-3">
                <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <UtensilsCrossed className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-gray-400">No meals logged today</p>
                <Link
                  href="/meals?log=1"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" /> Log a meal
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-5 pb-5 pt-2 space-y-px">
              {todayMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50/80 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{meal.mealName}</p>
                      <p className="text-[11px] text-gray-400">{getMealTypeLabel(meal.mealType)}</p>
                    </div>
                  </div>
                  {meal.calories && (
                    <span className="shrink-0 text-[11px] font-semibold text-gray-500 bg-gray-50 rounded-full px-2.5 py-1 ml-3">
                      {meal.calories} kcal
                    </span>
                  )}
                </div>
              ))}
              <div className="pt-3">
                <Link
                  href="/meals?log=1"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-150"
                >
                  <Plus className="h-3.5 w-3.5" /> Add meal
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Exercise panel */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 shadow-sm shadow-blue-200/60">
                <Dumbbell className="h-3.5 w-3.5 text-white" />
              </span>
              <h2 className="font-semibold text-gray-900 text-sm">Today&apos;s exercise</h2>
            </div>
            <Link
              href="/exercise"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {todayExercise.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 space-y-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <Dumbbell className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-400">No exercise logged today</p>
                <Link
                  href="/exercise?log=1"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" /> Log exercise
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-5 pb-5 pt-2 space-y-px">
              {todayExercise.map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50/80 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Dumbbell className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{ex.exerciseType}</p>
                      <p className="text-[11px] text-gray-400 capitalize">
                        {ex.intensity ?? 'No intensity set'}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-gray-500 bg-gray-50 rounded-full px-2.5 py-1 ml-3">
                    {ex.durationMinutes} min
                  </span>
                </div>
              ))}
              <div className="pt-3">
                <Link
                  href="/exercise?log=1"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-150"
                >
                  <Plus className="h-3.5 w-3.5" /> Add exercise
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Off-the-Ball nudge ────────────────────────────────────── */}
      {(() => {
        const dayNudges = [
          { emoji: '🚶', title: 'Walk something today', body: "Swap one car journey for your feet. Under two miles is totally walkable and you'll burn 150–200 kcal without it feeling like exercise.", cta: 'Park further away, walk to the shop, take the long route home.', colour: 'from-orange-500 to-amber-500' },
          { emoji: '🪜', title: 'Take the stairs all day', body: "Skip every lift and escalator you see today. Stair climbing burns roughly ten times more calories per minute than sitting in a lift.", cta: 'Make it a rule: if it\'s fewer than five floors, you take the stairs.', colour: 'from-orange-500 to-amber-500' },
          { emoji: '📺', title: 'Move during ad breaks', body: 'Ten squats, ten press-ups, ten calf raises. Do that every ad break tonight and you\'ll burn an extra 80–100 kcal without missing a second of your programme.', cta: 'Tonight: stand up every time an ad comes on.', colour: 'from-orange-500 to-amber-500' },
          { emoji: '⏱️', title: 'Set an hourly alarm', body: "If you're at a desk today, stand up every hour. Standing burns 50 kcal more per hour than sitting. Over eight hours, that's 400 kcal with zero sweat.", cta: 'Set a recurring alarm on your phone for every hour now.', colour: 'from-orange-500 to-amber-500' },
          { emoji: '🚴', title: 'Cycle one trip this week', body: "Most bikes can cover five miles in under 25 minutes. That's the same time as sitting in traffic and it burns around 250 kcal.", cta: "One trip this week on a bike instead of in a car. That's the whole challenge.", colour: 'from-orange-500 to-amber-500' },
          { emoji: '📞', title: 'Pace when you talk', body: "Next time you take a phone call, stand up and walk around. Pacing during a 20-minute call burns roughly 60 kcal more than sitting still for it.", cta: "Rule: phone calls happen standing up, starting today.", colour: 'from-orange-500 to-amber-500' },
          { emoji: '🛒', title: 'Walk to the shops', body: "Your local corner shop is almost certainly within 15 minutes on foot. That's an extra 1,500–2,000 steps each way for the price of a loaf of bread.", cta: "If you need something today, walk to get it.", colour: 'from-orange-500 to-amber-500' },
        ]
        const nudge = dayNudges[today.getDay()]
        return (
          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 pt-5 pb-4 border-b border-orange-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 shadow-sm shadow-orange-200/60 text-sm">
                ⚡
              </span>
              <h2 className="font-semibold text-gray-900 text-sm">Off-the-Ball Work</h2>
              <span className="ml-auto text-xs text-gray-400">Move more, eat the same, lose more</span>
            </div>
            <div className="px-5 py-4 flex items-start gap-4">
              <span className="text-3xl shrink-0 mt-0.5">{nudge.emoji}</span>
              <div className="space-y-1.5 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{nudge.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{nudge.body}</p>
                <div className="inline-block rounded-lg bg-orange-50 border border-orange-100 px-3 py-2 text-xs font-medium text-orange-700">
                  🎯 {nudge.cta}
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── CTA banner ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-7 text-white">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -right-4 w-64 h-64 rounded-full bg-teal-800/30" />
        <div className="pointer-events-none absolute top-4 right-32 w-6 h-6 rounded-full bg-white/10" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-emerald-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
              AI-powered
            </span>
          </div>
          <h2 className="text-lg font-bold mb-1 leading-tight">What&apos;s for dinner tonight?</h2>
          <p className="text-emerald-100/80 text-sm mb-5">
            Get a personalised meal suggestion based on your family&apos;s preferences.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/meals?suggest=1"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-md shadow-black/10"
            >
              <Sparkles className="h-4 w-4" /> Get AI suggestion
            </Link>
            <Link
              href="/meals?log=1"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-colors"
            >
              <UtensilsCrossed className="h-4 w-4" /> Log a meal
            </Link>
            <Link
              href="/exercise?log=1"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-colors"
            >
              <Dumbbell className="h-4 w-4" /> Log exercise
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
