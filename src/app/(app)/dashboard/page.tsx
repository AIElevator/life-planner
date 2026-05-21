import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate, formatCurrency, getMealTypeLabel } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format, startOfDay, endOfDay, subDays } from 'date-fns'
import { UtensilsCrossed, Dumbbell, Flame, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await requireAuth()
  const today = new Date()

  const [todayMeals, todayExercise, recentMeals, recentExercise, weeklyStats] = await Promise.all([
    prisma.mealLog.findMany({
      where: { userId: session.id, date: { gte: startOfDay(today), lte: endOfDay(today) } },
      include: { members: true },
      orderBy: { date: 'asc' },
    }),
    prisma.exerciseLog.findMany({
      where: { userId: session.id, date: { gte: startOfDay(today), lte: endOfDay(today) } },
      orderBy: { date: 'asc' },
    }),
    prisma.mealLog.findMany({
      where: { userId: session.id },
      include: { members: true },
      orderBy: { date: 'desc' },
      take: 5,
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

  const totalCaloriesToday = todayMeals.reduce((sum, m) => sum + (m.calories ?? 0), 0)
  const totalExerciseMinutes = todayExercise.reduce((sum, e) => sum + e.durationMinutes, 0)
  const weeklyCaloriesBurned = recentExercise.reduce((sum, e) => sum + (e.caloriesBurned ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Good {getGreeting()}, {session.name?.split(' ')[0] ?? 'there'}</h1>
        <p className="text-gray-500 text-sm mt-1">{format(today, 'EEEE, d MMMM yyyy')}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={UtensilsCrossed} label="Meals today" value={String(todayMeals.length)} colour="emerald" />
        <StatCard icon={Flame} label="Calories today" value={totalCaloriesToday > 0 ? String(totalCaloriesToday) : '—'} colour="orange" />
        <StatCard icon={Dumbbell} label="Exercise today" value={totalExerciseMinutes > 0 ? `${totalExerciseMinutes}m` : '—'} colour="blue" />
        <StatCard icon={TrendingUp} label="Cal burned (7d)" value={weeklyCaloriesBurned > 0 ? String(weeklyCaloriesBurned) : '—'} colour="purple" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's meals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Today&apos;s meals</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/meals">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayMeals.length === 0 ? (
              <EmptyState message="No meals logged today" href="/meals" cta="Log a meal" />
            ) : (
              <ul className="space-y-2">
                {todayMeals.map((meal) => (
                  <li key={meal.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{meal.mealName}</span>
                      <span className="text-gray-400 ml-2 text-xs">{getMealTypeLabel(meal.mealType)}</span>
                    </div>
                    {meal.calories && <span className="text-gray-500">{meal.calories} kcal</span>}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Today's exercise */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Today&apos;s exercise</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/exercise">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayExercise.length === 0 ? (
              <EmptyState message="No exercise logged today" href="/exercise" cta="Log exercise" />
            ) : (
              <ul className="space-y-2">
                {todayExercise.map((ex) => (
                  <li key={ex.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{ex.exerciseType}</span>
                    <span className="text-gray-500">{ex.durationMinutes} min</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link href="/meals?suggest=1">
              <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
              <span className="text-sm">Get meal suggestion</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link href="/meals?log=1">
              <UtensilsCrossed className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Log a meal</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto flex-col gap-2 py-4">
            <Link href="/exercise?log=1">
              <Dumbbell className="h-5 w-5 text-purple-500" />
              <span className="text-sm">Log exercise</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function StatCard({ icon: Icon, label, value, colour }: { icon: React.FC<{className?: string}>, label: string, value: string, colour: string }) {
  const colours: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
  }
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colours[colour]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="font-semibold text-lg leading-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ message, href, cta }: { message: string; href: string; cta: string }) {
  return (
    <div className="text-center py-4 space-y-2">
      <p className="text-sm text-gray-400">{message}</p>
      <Button asChild variant="outline" size="sm">
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  )
}
