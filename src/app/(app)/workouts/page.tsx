import { categories, exercises, workoutPlans } from '@/lib/workouts'
import { Clock, Flame, ChevronDown } from 'lucide-react'

export default async function WorkoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; plan?: string }>
}) {
  const params = await searchParams
  const activeCategory = params.category ?? 'all'
  const activePlan = params.plan ?? null

  const filtered = activeCategory === 'all'
    ? exercises
    : exercises.filter(e => e.category === activeCategory)

  const selectedPlan = activePlan
    ? workoutPlans.find(p => p.id === activePlan)
    : null
  const planExercises = selectedPlan
    ? selectedPlan.exercises.map(id => exercises.find(e => e.id === id)).filter(Boolean)
    : null

  const difficultyColour = (d: string) =>
    d === 'beginner' ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
    : d === 'intermediate' ? 'bg-amber-50 text-amber-700 border-amber-100'
    : 'bg-red-50 text-red-700 border-red-100'

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold">Home Workouts</h1>
        <p className="text-gray-500 text-sm mt-1">No equipment needed — do these anywhere, any time</p>
      </div>

      {/* Workout plans */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Ready-made plans</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {workoutPlans.map(plan => (
            <a
              key={plan.id}
              href={`/workouts?plan=${plan.id}`}
              className={`rounded-2xl border p-5 transition-all hover:shadow-md ${activePlan === plan.id ? 'border-emerald-300 bg-emerald-50' : 'border-gray-100 bg-white hover:border-emerald-200'}`}
            >
              <div className="text-3xl mb-3">{plan.emoji}</div>
              <h3 className="font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xs font-medium rounded-full border px-2.5 py-0.5 capitalize ${difficultyColour(plan.difficulty)}`}>
                  {plan.difficulty}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" /> {plan.targetMinutes} min
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Plan detail */}
      {selectedPlan && planExercises && (
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{selectedPlan.emoji}</span>
            <div>
              <h2 className="font-bold text-lg">{selectedPlan.name}</h2>
              <p className="text-emerald-100 text-sm">{selectedPlan.description}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {planExercises.map((ex, i) => ex && (
              <div key={ex.id} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <div>
                  <p className="font-medium text-sm">{ex.emoji} {ex.name}</p>
                  <p className="text-emerald-200 text-xs">{ex.sets} sets × {ex.reps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div>
        <div className="flex gap-2 flex-wrap mb-5">
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`/workouts?category=${cat.id}${activePlan ? `&plan=${activePlan}` : ''}`}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.emoji} {cat.label}
            </a>
          ))}
        </div>

        {/* Exercise cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(ex => (
            <details key={ex.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all">
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <span className="text-3xl shrink-0">{ex.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{ex.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{ex.muscles.join(' · ')}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-medium rounded-full border px-2.5 py-0.5 capitalize ${difficultyColour(ex.difficulty)}`}>
                      {ex.difficulty}
                    </span>
                    <span className="text-xs text-gray-400">{ex.sets} sets × {ex.reps}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Flame className="h-3 w-3 text-orange-400" /> ~{ex.calories * ex.sets} kcal
                    </span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">How to do it</p>
                  <ol className="space-y-1.5">
                    {ex.instructions.map((step, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Tips</p>
                  <ul className="space-y-1">
                    {ex.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-500">
                        <span className="text-emerald-500 shrink-0">✓</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2.5 text-center">
                    <p className="text-xs text-gray-400">Sets</p>
                    <p className="font-bold text-gray-900">{ex.sets}</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2.5 text-center">
                    <p className="text-xs text-gray-400">Reps / Time</p>
                    <p className="font-bold text-gray-900">{ex.reps}</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-gray-50 border border-gray-100 px-4 py-2.5 text-center">
                    <p className="text-xs text-gray-400">Rest</p>
                    <p className="font-bold text-gray-900">{ex.restSeconds}s</p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
