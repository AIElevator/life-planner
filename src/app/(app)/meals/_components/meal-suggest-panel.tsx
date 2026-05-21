'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Sparkles, Clock, PoundSterling, ChefHat, Check, Loader2 } from 'lucide-react'
import { saveMealPlan } from '@/actions/meals'

type FamilyMember = { id: string; name: string; age: number; relationship: string }

type Suggestion = {
  name: string
  description: string
  ingredients: string[]
  estimatedCost: string
  prepTime: string
  recipe: string[]
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
      if (!res.ok) throw new Error('Failed to get suggestions')
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
    <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          AI meal suggestions
        </CardTitle>
        <CardDescription>Tell Claude who&apos;s eating and get personalised suggestions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Who's eating */}
        <div className="space-y-2">
          <Label>Who&apos;s eating?</Label>
          <div className="flex flex-wrap gap-2">
            {familyMembers.map(member => (
              <button
                key={member.id}
                type="button"
                onClick={() => toggleMember(member.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedMembers.includes(member.id)
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                }`}
              >
                {member.name} ({member.age})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="mealTypeSelect">Meal</Label>
            <select
              id="mealTypeSelect"
              value={mealType}
              onChange={e => setMealType(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dateInput">Date</Label>
            <Input
              id="dateInput"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="budgetInput">Budget (£, optional)</Label>
            <Input
              id="budgetInput"
              type="number"
              placeholder="e.g. 15"
              value={budgetPerMeal}
              onChange={e => setBudgetPerMeal(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notesInput">Any requests? (optional)</Label>
          <Input
            id="notesInput"
            placeholder="e.g. something quick, using chicken, comfort food night..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={getSuggestions} disabled={loading} className="w-full md:w-auto">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Claude is thinking…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Get suggestions
            </>
          )}
        </Button>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-4 pt-2">
            {suggestions.map((s, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-base">{s.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={saved.includes(s.name) ? 'secondary' : 'outline'}
                    onClick={() => handleSave(s)}
                    disabled={saved.includes(s.name)}
                    className="shrink-0"
                  >
                    {saved.includes(s.name) ? (
                      <><Check className="h-3.5 w-3.5" /> Saved</>
                    ) : 'Save to plan'}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {s.prepTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <PoundSterling className="h-3.5 w-3.5" /> {s.estimatedCost}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {s.ingredients.map((ing, j) => (
                    <span key={j} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                      {ing}
                    </span>
                  ))}
                </div>

                <details className="group">
                  <summary className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 cursor-pointer list-none hover:text-emerald-700">
                    <ChefHat className="h-3.5 w-3.5" />
                    How to make it
                    <span className="ml-auto text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <ol className="mt-3 space-y-1.5 pl-4">
                    {s.recipe.map((step, j) => (
                      <li key={j} className="text-sm text-gray-600 list-decimal">{step}</li>
                    ))}
                  </ol>
                </details>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
