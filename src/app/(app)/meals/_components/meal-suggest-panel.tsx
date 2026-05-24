'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Sparkles, Clock, PoundSterling, ChefHat, Check, Loader2, X, Users } from 'lucide-react'
import { saveMealPlan } from '@/actions/meals'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FamilyMember = { id: string; name: string; age: number; relationship: string }
type Suggestion = {
  name: string
  description: string
  ingredients: string[]
  estimatedCost: string
  prepTime: string
  recipe: string[]
}

const mealTypeEmoji: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
}

export function MealSuggestPanel({ familyMembers }: { familyMembers: FamilyMember[] }) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(familyMembers.map(m => m.id))
  const [mealType, setMealType] = useState('dinner')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [budgetPerMeal, setBudgetPerMeal] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [error, setError] = useState('')
  const [saved, setSaved] = useState<string[]>([])

  const toggleMember = (id: string) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const getSuggestions = async () => {
    if (selectedMembers.length === 0) {
      setError('Please select at least one person')
      return
    }
    setLoading(true)
    setError('')
    setSuggestions([])
    try {
      const res = await fetch('/api/suggest-meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberIds: selectedMembers, mealType, date, budgetPerMeal: budgetPerMeal || null, notes }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSuggestions(data.suggestions ?? [])
    } catch {
      setError('Could not get suggestions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (suggestion: Suggestion) => {
    await saveMealPlan({
      date,
      mealType,
      mealName: suggestion.name,
      recipe: JSON.stringify(suggestion),
      estimatedCost: parseFloat(suggestion.estimatedCost.replace(/[^0-9.]/g, '')) || undefined,
      memberIds: selectedMembers,
    })
    setSaved(prev => [...prev, suggestion.name])
  }

  return (
    <div className="space-y-6">
      {/* Config panel */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI meal suggestions</h2>
              <p className="mt-0.5 text-sm text-violet-200">Claude picks the perfect meal for your family</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Who's eating */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <Label className="text-sm font-semibold text-gray-700">Who&apos;s eating?</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {familyMembers.map(member => {
                const active = selectedMembers.includes(member.id)
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-200'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-600'
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {member.name}
                    <span className={`text-xs ${active ? 'text-violet-200' : 'text-gray-400'}`}>
                      {member.age}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Meal type */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setMealType(type)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition-all duration-150 ${
                  mealType === type
                    ? 'border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-200'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-violet-200 hover:bg-violet-50/50'
                }`}
              >
                <span className="text-xl">{mealTypeEmoji[type]}</span>
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>

          {/* Date + budget */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Budget (£, optional)</Label>
              <Input
                type="number"
                placeholder="e.g. 15"
                value={budgetPerMeal}
                onChange={e => setBudgetPerMeal(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Any requests? (optional)</Label>
            <Input
              placeholder="e.g. something quick, using chicken, comfort food…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              <X className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={getSuggestions}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all duration-150 hover:-translate-y-0.5 hover:from-violet-700 hover:to-purple-800 hover:shadow-violet-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Claude is thinking…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Get 3 suggestions
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-semibold text-gray-900">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Claude&apos;s suggestions for you
          </h3>

          {suggestions.map((s, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-150 hover:border-violet-100 hover:shadow-md"
            >
              {/* Card header */}
              <div className="border-b border-gray-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-violet-500">
                      Option {i + 1}
                    </span>
                    <h3 className="mt-1.5 text-lg font-bold text-gray-900">{s.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.description}</p>
                  </div>
                  <button
                    onClick={() => handleSave(s)}
                    disabled={saved.includes(s.name)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                      saved.includes(s.name)
                        ? 'cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
                    }`}
                  >
                    {saved.includes(s.name) ? (
                      <><Check className="h-3.5 w-3.5" /> Saved</>
                    ) : (
                      'Save plan'
                    )}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-50">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                    </span>
                    {s.prepTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50">
                      <PoundSterling className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                    {s.estimatedCost}
                  </span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="border-b border-gray-50 px-5 py-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {s.ingredients.map((ing, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center rounded-lg border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recipe */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ChefHat className="h-4 w-4 text-amber-500" />
                    How to make it
                  </span>
                  <span className="text-xs text-gray-400 group-open:hidden">Show recipe ▾</span>
                  <span className="hidden text-xs text-gray-400 group-open:block">Hide ▴</span>
                </summary>
                <div className="px-5 pb-5">
                  <ol className="space-y-3">
                    {s.recipe.map((step, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                          {j + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-gray-600">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
