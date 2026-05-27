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
  Scale,
  Copy,
} from 'lucide-react'
import Link from 'next/link'
import { copyYesterdaysMeals } from '@/actions/meals'

// ── Calorie progress ring (SVG) ──────────────────────────────────────────────
function CalorieRing({
  consumed,
  target,
}: {
  consumed: number
  target: number
}) {
  const r = 42
  const circ = 2 * Math.PI * r // ≈ 263.9
  const pct = Math.min(consumed / target, 1)
  const dash = pct * circ
  const over = consumed > target
  const remaining = Math.max(target - consumed, 0)

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0" aria-label="Calorie progress">
      {/* Track */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#f3f4f6" strokeWidth="9" />
      {/* Progress */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={over ? '#f97316' : pct > 0.85 ? '#f59e0b' : '#10b981'}
        strokeWidth="9"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      {/* Centre text */}
      <text x="50" y="46" textAnchor="middle" fontSize="16" fontWeight="700" fill={over ? '#f97316' : '#111827'}>
        {remaining > 0 ? remaining.toLocaleString() : consumed.toLocaleString()}
      </text>
      <text x="50" y="57" textAnchor="middle" fontSize="7" fill="#9ca3af">
        {over ? 'over target' : 'kcal left'}
      </text>
    </svg>
  )
}

// ── Protein bar ───────────────────────────────────────────────────────────────
function ProteinBar({
  consumed,
  target,
}: {
  consumed: number
  target: number
}) {
  const pct = Math.min((consumed / target) * 100, 100)
  const over = consumed > target
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">Protein</span>
        <span className={`font-semibold ${over ? 'text-emerald-600' : 'text-gray-500'}`}>
          {consumed}g <span className="font-normal text-gray-400">/ {target}g</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${over ? 'bg-emerald-500' : pct > 70 ? 'bg-blue-400' : 'bg-blue-300'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const session = await requireAuth()
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sunday

  const [todayMeals, todayExercise, recentExercise, weeklyStats, user, latestWeighIn, yesterdayMeals] =
    await Promise.all([
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
      prisma.user.findUnique({
        where: { id: session.id },
        select: {
          name: true,
          dailyCalorieTarget: true,
          dailyProteinTarget: true,
          weighInDay: true,
          matchDayOfWeek: true,
        },
      }),
      prisma.weighIn.findFirst({
        where: { userId: session.id },
        orderBy: { date: 'desc' },
      }),
      prisma.mealLog.findMany({
        where: {
          userId: session.id,
          date: { gte: startOfDay(subDays(today, 1)), lte: endOfDay(subDays(today, 1)) },
        },
        select: { mealType: true },
      }),
    ])

  const calorieTarget = user?.dailyCalorieTarget ?? 2000
  const proteinTarget = user?.dailyProteinTarget ?? 150
  const totalCaloriesToday = todayMeals.reduce((sum: number, m) => sum + (m.calories ?? 0), 0)
  const totalProteinToday = todayMeals.reduce((sum: number, m) => {
    // Protein isn't stored per meal; proxy via recipe library if we can, otherwise 0
    return sum
  }, 0)
  const totalExerciseMinutes = todayExercise.reduce((sum: number, e) => sum + e.durationMinutes, 0)
  const weeklyCaloriesBurned = recentExercise.reduce((sum: number, e) => sum + (e.caloriesBurned ?? 0), 0)

  const hour = today.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  // Day names for contextual logic
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const todayName = dayNames[dayOfWeek]
  const tomorrowName = dayNames[(dayOfWeek + 1) % 7]

  const isMatchDay = user?.matchDayOfWeek !== null && user?.matchDayOfWeek !== undefined && dayOfWeek === user.matchDayOfWeek
  const isWeighInDay = user?.weighInDay && todayName === user.weighInDay
  const isWeighInEve = user?.weighInDay && tomorrowName === user.weighInDay

  // Yesterday meals: does the user have anything to copy?
  const hasYesterdayMeals = yesterdayMeals.length > 0
  const todayTypes = new Set(todayMeals.map((m) => m.mealType))
  const canCopyYesterday = hasYesterdayMeals && yesterdayMeals.some((m) => !todayTypes.has(m.mealType))

  const stats = [
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
    },
    {
      label: 'Calories burned',
      value: weeklyCaloriesBurned > 0 ? weeklyCaloriesBurned.toLocaleString() : '—',
      sub: 'Last 7 days (exercise)',
      icon: Flame,
      iconBg: 'bg-orange-500',
      iconShadow: 'shadow-orange-200/70',
      cardBorder: 'hover:border-orange-100',
    },
    {
      label: 'Last weigh-in',
      value: latestWeighIn ? `${latestWeighIn.weightKg.toFixed(1)} kg` : '—',
      sub: latestWeighIn ? format(latestWeighIn.date, 'd MMM') : 'Not logged yet',
      icon: Scale,
      iconBg: 'bg-violet-500',
      iconShadow: 'shadow-violet-200/70',
      cardBorder: 'hover:border-violet-100',
    },
    {
      label: 'Meals this week',
      value: String(weeklyStats._count),
      sub: weeklyStats._sum.budget
        ? `${formatCurrency(weeklyStats._sum.budget)} spent`
        : 'No budget tracked',
      icon: TrendingUp,
      iconBg: 'bg-emerald-500',
      iconShadow: 'shadow-emerald-200/70',
      cardBorder: 'hover:border-emerald-100',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl">

      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-1.5">
            {format(today, 'EEEE, d MMMM yyyy')}
          </p>
          <h1 className="text-[2rem] font-bold leading-tight text-gray-900 tracking-tight">
            {greeting}, {firstName}
          </h1>
        </div>
        <Link
          href="/meals?suggest=1"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/70 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          Suggest dinner
        </Link>
      </div>

      {/* ── Calorie & protein progress ────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-5">
          <CalorieRing consumed={totalCaloriesToday} target={calorieTarget} />
          <div className="flex-1 space-y-4 min-w-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Today&apos;s calories</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-gray-900">{totalCaloriesToday.toLocaleString()}</span>
                <span className="text-sm text-gray-400">of {calorieTarget.toLocaleString()} kcal</span>
              </div>
            </div>
            <ProteinBar consumed={totalProteinToday} target={proteinTarget} />
            {!user?.dailyCalorieTarget && (
              <Link href="/settings" className="text-xs text-emerald-600 hover:underline font-medium">
                Set your calorie target in Settings →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Match day card ────────────────────────────────────────── */}
      {isMatchDay && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white space-y-4">
          <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
          <div className="relative flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <p className="font-bold text-base leading-tight">Match day.</p>
              <p className="text-blue-200 text-xs mt-0.5">Eat light today → weigh in → rapid energy snacks → play.</p>
            </div>
          </div>

          <div className="relative grid sm:grid-cols-3 gap-3">

            {/* Phase 1 */}
            <div className="rounded-xl bg-white/10 border border-white/15 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">1</span>
                <p className="text-xs font-bold text-white uppercase tracking-wide">All day: eat light, drink plenty</p>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Keep sodium and portions down — but keep drinking water. Dehydration tanks your
                performance in the first 20 minutes. Water doesn&apos;t linger on the scales like food.
              </p>
              <ul className="text-xs text-blue-100 space-y-0.5">
                <li>💧 2–3 litres of water through the day</li>
                <li>🫙 Greek yoghurt and fruit</li>
                <li>🥗 Light salad or chicken wrap</li>
                <li>☕ Tea and coffee count too</li>
              </ul>
            </div>

            {/* Phase 2 — the critical one */}
            <div className="rounded-xl bg-yellow-400/20 border border-yellow-300/30 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300/30 text-[10px] font-bold">2</span>
                <p className="text-xs font-bold text-yellow-200 uppercase tracking-wide">After weigh-in: fuel up</p>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Weigh-in done. You have roughly 30 minutes before kick-off. Eat something
                fast-releasing — portable, no cooking needed, hits the blood quickly.
              </p>
              <ul className="text-xs text-blue-100 space-y-0.5">
                <li>💧 400–600 ml water first</li>
                <li>🍌 Banana (the best option)</li>
                <li>🍬 Jelly babies or energy sweets</li>
                <li>🍚 Rice cakes</li>
                <li>🍊 Small OJ or sports drink</li>
                <li>⚡ Energy gel if you have one</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="rounded-xl bg-white/10 border border-white/15 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">3</span>
                <p className="text-xs font-bold text-white uppercase tracking-wide">After the match: recover</p>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                You&apos;ve burned 600–900 kcal. Get protein and carbs in within 45 minutes
                of the final whistle.
              </p>
              <ul className="text-xs text-blue-100 space-y-0.5">
                <li>🍗 Chicken and rice</li>
                <li>🍝 Pasta with lean mince</li>
                <li>🥙 Big chicken wrap</li>
                <li>🥛 Protein shake + banana</li>
              </ul>
            </div>

          </div>

          <div className="relative flex flex-wrap gap-2">
            <Link
              href="/advice#match-day"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25 transition-colors border border-white/20"
            >
              Full match day guide →
            </Link>
            <Link
              href="/exercise?log=1"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25 transition-colors border border-white/20"
            >
              <Dumbbell className="h-3.5 w-3.5" /> Log the match
            </Link>
          </div>
        </div>
      )}

      {/* ── Weigh-in day card ─────────────────────────────────────── */}
      {isWeighInDay && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 text-white">
          <div className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
          <div className="relative flex items-start gap-4">
            <span className="text-3xl shrink-0 mt-0.5">⚖️</span>
            <div className="space-y-1.5">
              <p className="font-bold text-base">Weigh-in today.</p>
              <p className="text-violet-100 text-sm leading-relaxed">
                Weigh yourself first thing, before eating or drinking, in the same kit as last week.
                Then log it so you can track the trend over time.
              </p>
              <Link
                href="/progress"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25 transition-colors border border-white/20"
              >
                <Scale className="h-3.5 w-3.5" /> Log today&apos;s weight
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Weigh-in eve card ─────────────────────────────────────── */}
      {!isWeighInDay && isWeighInEve && (
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
          <div className="flex items-start gap-4">
            <span className="text-2xl shrink-0 mt-0.5">📋</span>
            <div className="space-y-1">
              <p className="font-semibold text-amber-800 text-sm">Weigh-in tomorrow. Time to set yourself up.</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                Keep sodium low tonight (skip crisps and takeaways), drink plenty of water and get
                a good night&apos;s sleep. A light dinner goes a long way on the scales in the morning.
              </p>
              <Link href="/advice#weigh-in" className="text-xs text-amber-600 font-semibold hover:underline">
                See the full weigh-in prep guide →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Stat cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, iconBg, iconShadow, cardBorder }) => (
          <div
            key={label}
            className={`group relative bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${cardBorder} overflow-hidden`}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className={`relative w-10 h-10 rounded-xl ${iconBg} shadow-md ${iconShadow} flex items-center justify-center mb-4`}>
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
                <div className="flex flex-col items-center gap-2">
                  <Link
                    href="/meals?log=1"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Log a meal
                  </Link>
                  {canCopyYesterday && (
                    <form action={copyYesterdaysMeals}>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy yesterday&apos;s meals
                      </button>
                    </form>
                  )}
                </div>
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
              <div className="pt-3 flex gap-2">
                <Link
                  href="/meals?log=1"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-150"
                >
                  <Plus className="h-3.5 w-3.5" /> Add meal
                </Link>
                {canCopyYesterday && (
                  <form action={copyYesterdaysMeals} className="flex-1">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-150"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy yesterday
                    </button>
                  </form>
                )}
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
          { emoji: '🚶', title: 'Walk something today', body: "Swap one car journey for your feet. Under two miles is totally walkable and you'll burn 150–200 kcal without it feeling like exercise.", cta: 'Park further away, walk to the shop, take the long route home.' },
          { emoji: '🪜', title: 'Take the stairs all day', body: "Skip every lift and escalator you see today. Stair climbing burns roughly ten times more calories per minute than sitting in a lift.", cta: "If it's fewer than five floors, take the stairs." },
          { emoji: '📺', title: 'Move during ad breaks', body: 'Ten squats, ten press-ups, ten calf raises. Do that every ad break tonight and you\'ll burn an extra 80–100 kcal without missing a second of your programme.', cta: 'Tonight: stand up every time an ad comes on.' },
          { emoji: '⏱️', title: 'Set an hourly alarm', body: "If you're at a desk today, stand up every hour. Standing burns 50 kcal more per hour than sitting. Over eight hours, that's 400 kcal with zero sweat.", cta: 'Set a recurring alarm on your phone for every hour now.' },
          { emoji: '🚴', title: 'Cycle one trip this week', body: "Most bikes can cover five miles in under 25 minutes. That's the same time as sitting in traffic and it burns around 250 kcal.", cta: "One trip this week on a bike instead of in a car. That's the whole challenge." },
          { emoji: '📞', title: 'Pace when you talk', body: "Next time you take a phone call, stand up and walk around. Pacing during a 20-minute call burns roughly 60 kcal more than sitting still for it.", cta: "Rule: phone calls happen standing up, starting today." },
          { emoji: '🛒', title: 'Walk to the shops', body: "Your local corner shop is almost certainly within 15 minutes on foot. That's an extra 1,500–2,000 steps each way for the price of a loaf of bread.", cta: "If you need something today, walk to get it." },
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
