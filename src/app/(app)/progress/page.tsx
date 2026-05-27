import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { format, startOfDay } from 'date-fns'
import { TrendingDown, TrendingUp, Minus, Scale, Trash2 } from 'lucide-react'
import { logWeighIn, deleteWeighIn } from '@/actions/weigh-in'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// Simple SVG sparkline — no library needed
function WeightChart({ entries }: { entries: { date: Date; weightKg: number }[] }) {
  if (entries.length < 2) return null

  const padding = 16
  const width = 320
  const height = 100
  const innerW = width - padding * 2
  const innerH = height - padding * 2

  const weights = entries.map((e) => e.weightKg)
  const minW = Math.min(...weights) - 1
  const maxW = Math.max(...weights) + 1

  const points = entries.map((e, i) => {
    const x = padding + (i / (entries.length - 1)) * innerW
    const y = padding + ((maxW - e.weightKg) / (maxW - minW)) * innerH
    return `${x},${y}`
  })

  const polyline = points.join(' ')
  const first = entries[0]
  const last = entries[entries.length - 1]
  const delta = last.weightKg - first.weightKg

  return (
    <div className="space-y-1">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-sm"
        aria-label="Weight trend chart"
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={padding}
            y1={padding + f * innerH}
            x2={width - padding}
            y2={padding + f * innerH}
            stroke="#f3f4f6"
            strokeWidth="1"
          />
        ))}
        {/* Trend line */}
        <polyline
          points={polyline}
          fill="none"
          stroke={delta <= 0 ? '#10b981' : '#f97316'}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Dots */}
        {points.map((p, i) => {
          const [x, y] = p.split(',').map(Number)
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={delta <= 0 ? '#10b981' : '#f97316'}
            />
          )
        })}
      </svg>
      <p className="text-xs text-gray-400">
        {format(first.date, 'd MMM')} → {format(last.date, 'd MMM')}
        {' · '}
        <span className={delta <= 0 ? 'text-emerald-600 font-semibold' : 'text-orange-500 font-semibold'}>
          {delta <= 0 ? '' : '+'}{delta.toFixed(1)} kg
        </span>
      </p>
    </div>
  )
}

export default async function ProgressPage() {
  const session = await requireAuth()
  const today = startOfDay(new Date())

  const [weightLogs, user] = await Promise.all([
    prisma.weighIn.findMany({
      where: { userId: session.id },
      orderBy: { date: 'desc' },
      take: 20,
    }),
    prisma.user.findUnique({
      where: { id: session.id },
      select: { name: true },
    }),
  ])

  const latest = weightLogs[0]
  const previous = weightLogs[1]
  const delta = latest && previous ? latest.weightKg - previous.weightKg : null

  const chartEntries = [...weightLogs]
    .reverse()
    .slice(-12)
    .map((e) => ({ date: e.date, weightKg: e.weightKg }))

  const totalLost =
    weightLogs.length >= 2
      ? weightLogs[weightLogs.length - 1].weightKg - weightLogs[0].weightKg
      : null

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-gray-500 text-sm mt-1">Log your weight and track the trend over time.</p>
      </div>

      {/* Current weight + delta */}
      {latest && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center space-y-1">
            <p className="text-3xl font-bold text-gray-900">{latest.weightKg.toFixed(1)}</p>
            <p className="text-xs text-gray-400 font-medium">kg — last logged</p>
            <p className="text-xs text-gray-300">{format(latest.date, 'd MMM yyyy')}</p>
          </div>
          {delta !== null && (
            <div className={`bg-white rounded-2xl border p-5 text-center space-y-1 ${delta < 0 ? 'border-emerald-100' : delta > 0 ? 'border-orange-100' : 'border-gray-100'}`}>
              <div className="flex items-center justify-center gap-1">
                {delta < 0 ? (
                  <TrendingDown className="h-4 w-4 text-emerald-500" />
                ) : delta > 0 ? (
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                ) : (
                  <Minus className="h-4 w-4 text-gray-400" />
                )}
                <p className={`text-3xl font-bold ${delta < 0 ? 'text-emerald-600' : delta > 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                  {delta > 0 ? '+' : ''}{delta.toFixed(1)}
                </p>
              </div>
              <p className="text-xs text-gray-400 font-medium">kg since last</p>
            </div>
          )}
          {totalLost !== null && (
            <div className={`bg-white rounded-2xl border p-5 text-center space-y-1 ${totalLost < 0 ? 'border-emerald-100' : 'border-gray-100'}`}>
              <p className={`text-3xl font-bold ${totalLost < 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                {totalLost <= 0 ? '' : '+'}{totalLost.toFixed(1)}
              </p>
              <p className="text-xs text-gray-400 font-medium">kg total</p>
              <p className="text-xs text-gray-300">all time</p>
            </div>
          )}
        </div>
      )}

      {/* Chart */}
      {chartEntries.length >= 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
            <Scale className="h-4 w-4 text-gray-400" />
            Weight trend
          </h2>
          <WeightChart entries={chartEntries} />
        </div>
      )}

      {/* Log new weight */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 text-sm mb-4">Log a weigh-in</h2>
        <form action={logWeighIn} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="weightKg">Weight (kg)</Label>
              <Input
                id="weightKg"
                name="weightKg"
                type="number"
                step="0.1"
                min="20"
                max="400"
                placeholder="e.g. 94.5"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={format(today, 'yyyy-MM-dd')}
              />
            </div>
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                name="notes"
                type="text"
                placeholder="e.g. ManvFat official weigh-in"
              />
            </div>
          </div>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl h-10 px-5">
            Log weight
          </Button>
        </form>
      </div>

      {/* History */}
      {weightLogs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">History</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {weightLogs.map((entry, i) => {
              const prev = weightLogs[i + 1]
              const d = prev ? entry.weightKg - prev.weightKg : null
              return (
                <div key={entry.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-900">{entry.weightKg.toFixed(1)} kg</div>
                    {d !== null && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d < 0 ? 'bg-emerald-50 text-emerald-700' : d > 0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'}`}>
                        {d > 0 ? '+' : ''}{d.toFixed(1)} kg
                      </span>
                    )}
                    {entry.notes && (
                      <span className="text-xs text-gray-400 hidden sm:block">{entry.notes}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{format(entry.date, 'EEE d MMM')}</span>
                    <form action={deleteWeighIn.bind(null, entry.id)}>
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {weightLogs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center space-y-2">
          <Scale className="h-8 w-8 text-gray-300 mx-auto" />
          <p className="text-sm text-gray-400">No weigh-ins logged yet.</p>
          <p className="text-xs text-gray-400">Log your first weight above to start tracking your progress.</p>
        </div>
      )}
    </div>
  )
}
