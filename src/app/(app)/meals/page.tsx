import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatCurrency, getMealTypeLabel } from '@/lib/utils'
import { UtensilsCrossed, Trash2, Star } from 'lucide-react'
import { deleteMealLog } from '@/actions/meals'
import { MealSuggestPanel } from './_components/meal-suggest-panel'
import { LogMealForm } from './_components/log-meal-form'
import { ShareDiaryButton } from './_components/share-diary-button'
import { startOfWeek } from 'date-fns'

export default async function MealsPage({
  searchParams,
}: {
  searchParams: Promise<{ suggest?: string; log?: string }>
}) {
  const session = await requireAuth()
  const params = await searchParams
  const showSuggest = params.suggest === '1'
  const showLog = params.log === '1'

  const [familyMembers, mealLogs] = await Promise.all([
    prisma.familyMember.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.mealLog.findMany({
      where: { userId: session.id },
      include: { members: true },
      orderBy: { date: 'desc' },
      take: 30,
    }),
  ])

  const thisWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Meals</h1>
          <p className="text-gray-500 text-sm mt-1">Plan, track, and get AI-powered suggestions</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild variant={showSuggest ? 'default' : 'outline'}>
            <a href="/meals?suggest=1">✨ Suggest meals</a>
          </Button>
          <Button asChild variant={showLog ? 'default' : 'outline'}>
            <a href="/meals?log=1">Log meal</a>
          </Button>
        </div>
      </div>

      {showSuggest && (
        <MealSuggestPanel familyMembers={familyMembers} />
      )}

      {showLog && (
        <Card>
          <CardHeader>
            <CardTitle>Log a meal</CardTitle>
          </CardHeader>
          <CardContent>
            <LogMealForm familyMembers={familyMembers} />
          </CardContent>
        </Card>
      )}

      {/* ManvFat diary share */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              📋 Share your food diary
            </h2>
            <p className="text-emerald-100 text-sm mt-0.5">
              Generate a link to this week&apos;s diary — paste it straight into WhatsApp for your ManvFat club owner.
            </p>
          </div>
          <ShareDiaryButton weekDate={thisWeekStart} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Meal history</CardTitle>
        </CardHeader>
        <CardContent>
          {mealLogs.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No meals logged yet</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {mealLogs.map((meal) => (
                <li key={meal.id} className="flex items-start justify-between py-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <UtensilsCrossed className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{meal.mealName}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span>{getMealTypeLabel(meal.mealType)}</span>
                        <span>{formatDate(meal.date)}</span>
                        {meal.calories && <span>{meal.calories} kcal</span>}
                        {meal.budget && <span>{formatCurrency(meal.budget)}</span>}
                        {meal.rating && (
                          <span className="flex items-center gap-0.5 text-amber-400">
                            <Star className="h-3 w-3 fill-current" />
                            {meal.rating}
                          </span>
                        )}
                      </div>
                      {meal.members.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {meal.members.map((m: { name: string }) => m.name).join(', ')}
                        </p>
                      )}
                      {meal.notes && <p className="text-xs text-gray-400 mt-0.5 italic">{meal.notes}</p>}
                    </div>
                  </div>
                  <form action={deleteMealLog.bind(null, meal.id)}>
                    <button type="submit" className="text-gray-300 hover:text-red-400 transition-colors p-1 shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
