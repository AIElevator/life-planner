import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { format, startOfWeek, endOfWeek, addDays, isSameDay } from 'date-fns'
import { UtensilsCrossed, Calendar, Flame, PoundSterling, Star } from 'lucide-react'

export default async function DiarySharePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const share = await prisma.diaryShare.findUnique({
    where: { token },
    include: { user: { select: { name: true } } },
  })

  if (!share) notFound()

  // Increment view count (fire and forget)
  prisma.diaryShare.update({
    where: { token },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})

  const weekStart = startOfWeek(share.weekStart, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(share.weekStart, { weekStartsOn: 1 })

  const meals = await prisma.mealLog.findMany({
    where: {
      userId: share.userId,
      date: { gte: weekStart, lte: weekEnd },
    },
    include: { members: { select: { name: true } } },
    orderBy: { date: 'asc' },
  })

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const totalCalories = meals.reduce((sum, m) => sum + (m.calories ?? 0), 0)
  const totalBudget = meals.reduce((sum, m) => sum + (m.budget ?? 0), 0)
  const mealsWithRating = meals.filter(m => m.rating)
  const avgRating = mealsWithRating.length
    ? (mealsWithRating.reduce((s, m) => s + (m.rating ?? 0), 0) / mealsWithRating.length).toFixed(1)
    : null

  const mealTypeOrder = ['breakfast', 'lunch', 'dinner', 'snack']
  const mealTypeEmoji: Record<string, string> = {
    breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍎',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-emerald-200 text-sm font-medium">Life Planner</p>
              <p className="font-bold text-lg">{share.user.name ?? 'Food Diary'}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1">
            {share.label ?? 'Weekly Food Diary'}
          </h1>
          <div className="flex items-center gap-2 text-emerald-100 text-sm">
            <Calendar className="h-4 w-4" />
            {format(weekStart, 'd MMM')} – {format(weekEnd, 'd MMM yyyy')}
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{meals.length}</p>
              <p className="text-emerald-200 text-xs mt-0.5">Meals logged</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{totalCalories > 0 ? totalCalories.toLocaleString() : '—'}</p>
              <p className="text-emerald-200 text-xs mt-0.5">Total kcal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{avgRating ? `${avgRating}★` : '—'}</p>
              <p className="text-emerald-200 text-xs mt-0.5">Avg rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily logs */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        {days.map((day) => {
          const dayMeals = meals
            .filter(m => isSameDay(new Date(m.date), day))
            .sort((a, b) => mealTypeOrder.indexOf(a.mealType) - mealTypeOrder.indexOf(b.mealType))
          const dayCalories = dayMeals.reduce((sum, m) => sum + (m.calories ?? 0), 0)
          const isToday = isSameDay(day, new Date())

          return (
            <div key={day.toISOString()} className={`bg-white rounded-2xl border overflow-hidden ${isToday ? 'border-emerald-200 shadow-md shadow-emerald-50' : 'border-gray-100'}`}>
              <div className={`flex items-center justify-between px-5 py-3.5 ${isToday ? 'bg-emerald-50' : 'bg-gray-50'} border-b ${isToday ? 'border-emerald-100' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2.5">
                  {isToday && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  <span className="font-semibold text-gray-800">{format(day, 'EEEE')}</span>
                  <span className="text-gray-400 text-sm">{format(day, 'd MMM')}</span>
                </div>
                {dayCalories > 0 && (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                    {dayCalories} kcal
                  </div>
                )}
              </div>

              {dayMeals.length === 0 ? (
                <div className="px-5 py-5 text-center text-sm text-gray-300">
                  No meals logged
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {dayMeals.map((meal) => (
                    <div key={meal.id} className="px-5 py-3.5 flex items-start gap-3">
                      <span className="text-lg mt-0.5">{mealTypeEmoji[meal.mealType] ?? '🍽️'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{meal.mealName}</p>
                            {meal.description && (
                              <p className="text-xs text-gray-400 mt-0.5">{meal.description}</p>
                            )}
                            {meal.members.length > 0 && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {meal.members.map(m => m.name).join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            {meal.calories && (
                              <span className="text-xs font-medium text-gray-500 bg-orange-50 text-orange-600 rounded-full px-2 py-0.5">
                                {meal.calories} kcal
                              </span>
                            )}
                            {meal.rating && (
                              <span className="text-xs font-medium text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
                                {'★'.repeat(meal.rating)}{'☆'.repeat(5 - meal.rating)}
                              </span>
                            )}
                            {meal.budget && (
                              <span className="text-xs text-gray-400">
                                £{meal.budget.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        {meal.notes && (
                          <p className="text-xs text-gray-400 mt-1 italic">&ldquo;{meal.notes}&rdquo;</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Footer */}
        <div className="text-center pt-4 pb-2 space-y-2">
          {totalBudget > 0 && (
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
              <PoundSterling className="h-4 w-4" />
              Total food spend this week: <strong>£{totalBudget.toFixed(2)}</strong>
            </p>
          )}
          <p className="text-xs text-gray-300">
            Shared via Life Planner · {format(share.createdAt, 'd MMM yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}
