import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dumbbell, Trash2, Clock, Flame } from 'lucide-react'
import Link from 'next/link'
import { LogExerciseForm } from './_components/log-exercise-form'
import { deleteExerciseLog } from '@/actions/exercise'
import { cn } from '@/lib/utils'

export default async function ExercisePage({
  searchParams,
}: {
  searchParams: Promise<{ log?: string }>
}) {
  const session = await requireAuth()
  const params = await searchParams
  const showForm = params.log === '1'

  const logs = await prisma.exerciseLog.findMany({
    where: { userId: session.id },
    orderBy: { date: 'desc' },
    take: 30,
  })

  const totalMinutes = logs.reduce((s, e) => s + e.durationMinutes, 0)
  const totalCalories = logs.reduce((s, e) => s + (e.caloriesBurned ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Exercise</h1>
          <p className="text-gray-500 text-sm mt-1">Track your workouts and activity</p>
        </div>
        {!showForm && (
          <Button asChild>
            <Link href="/exercise?log=1">Log exercise</Link>
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Log exercise</CardTitle>
          </CardHeader>
          <CardContent>
            <LogExerciseForm />
          </CardContent>
        </Card>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total minutes</p>
              <p className="font-semibold text-lg">{totalMinutes}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
              <Flame className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Calories burned</p>
              <p className="font-semibold text-lg">{totalCalories > 0 ? totalCalories : '—'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Exercise log</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">No exercise logged yet. Start tracking!</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {logs.map((log) => (
                <li key={log.id} className="flex items-start justify-between py-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Dumbbell className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{log.exerciseType}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                        <span>{log.durationMinutes} min</span>
                        {log.caloriesBurned && <span>{log.caloriesBurned} kcal</span>}
                        {log.intensity && (
                          <span className={cn(
                            'capitalize',
                            log.intensity === 'high' ? 'text-red-400' : log.intensity === 'moderate' ? 'text-amber-400' : 'text-green-500'
                          )}>
                            {log.intensity}
                          </span>
                        )}
                        <span>{formatDate(log.date)}</span>
                      </div>
                      {log.notes && <p className="text-xs text-gray-400 mt-0.5">{log.notes}</p>}
                    </div>
                  </div>
                  <form action={deleteExerciseLog.bind(null, log.id)}>
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
