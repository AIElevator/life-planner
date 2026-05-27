import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { subDays, startOfDay, format } from 'date-fns'

const ADMIN_EMAIL = 'davrhall@hotmail.co.uk'

export default async function AdminPage() {
  const session = await requireAuth()
  if (session.email !== ADMIN_EMAIL) redirect('/dashboard')

  const now = new Date()
  const day7 = startOfDay(subDays(now, 7))
  const day30 = startOfDay(subDays(now, 30))

  const [
    totalUsers,
    newUsers7d,
    newUsers30d,
    totalMealLogs,
    totalExerciseLogs,
    totalWeighIns,
    activeUsers7d,
    recentSignups,
    topMeals,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: day7 } } }),
    prisma.user.count({ where: { createdAt: { gte: day30 } } }),
    prisma.mealLog.count(),
    prisma.exerciseLog.count(),
    prisma.weighIn.count(),
    // Users who logged a meal or exercise in last 7 days
    prisma.user.count({
      where: {
        OR: [
          { mealLogs: { some: { createdAt: { gte: day7 } } } },
          { exerciseLogs: { some: { createdAt: { gte: day7 } } } },
        ],
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { name: true, email: true, createdAt: true },
    }),
    prisma.mealLog.groupBy({
      by: ['mealName'],
      _count: { mealName: true },
      orderBy: { _count: { mealName: 'desc' } },
      take: 10,
    }),
  ])

  const stats = [
    { label: 'Total users', value: totalUsers, colour: 'bg-emerald-50 text-emerald-700' },
    { label: 'New this week', value: newUsers7d, colour: 'bg-blue-50 text-blue-700' },
    { label: 'New this month', value: newUsers30d, colour: 'bg-violet-50 text-violet-700' },
    { label: 'Active last 7 days', value: activeUsers7d, colour: 'bg-orange-50 text-orange-700' },
    { label: 'Meals logged', value: totalMealLogs, colour: 'bg-amber-50 text-amber-700' },
    { label: 'Exercise sessions', value: totalExerciseLogs, colour: 'bg-cyan-50 text-cyan-700' },
    { label: 'Weigh-ins', value: totalWeighIns, colour: 'bg-rose-50 text-rose-700' },
  ]

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-gray-400 text-sm mt-1">Only visible to you.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, colour }) => (
          <div key={label} className={`rounded-2xl border border-gray-100 p-4 space-y-1 ${colour}`}>
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            <p className="text-xs font-medium opacity-70">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent sign-ups */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Recent sign-ups</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {recentSignups.map((u) => (
            <li key={u.email} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{u.name ?? '(no name)'}</p>
                <p className="text-xs text-gray-400">{u.email}</p>
              </div>
              <p className="text-xs text-gray-400 shrink-0 ml-4">
                {format(u.createdAt, 'd MMM yyyy')}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Top meals */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Most logged meals</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {topMeals.map((m, i) => (
            <li key={m.mealName} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 w-4">{i + 1}</span>
                <p className="text-sm text-gray-800">{m.mealName}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-0.5">
                {m._count.mealName}×
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
