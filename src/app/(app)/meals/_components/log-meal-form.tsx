'use client'

import { useActionState } from 'react'
import { logMeal } from '@/actions/meals'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'

type FamilyMember = { id: string; name: string; age: number; relationship: string }

export function LogMealForm({
  familyMembers,
  defaultMealName,
  defaultCalories,
  defaultMealType,
}: {
  familyMembers: FamilyMember[]
  defaultMealName?: string
  defaultCalories?: number
  defaultMealType?: string
}) {
  const [state, action, pending] = useActionState(logMeal, undefined)

  return (
    <form action={action} className="space-y-4">
      {state?.success && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            error={state?.errors?.date?.[0]}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="mealType">Meal type</Label>
          <select
            name="mealType"
            defaultValue={defaultMealType ?? 'dinner'}
            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="mealName">What did you eat?</Label>
        <Input
          id="mealName"
          name="mealName"
          defaultValue={defaultMealName ?? ''}
          placeholder="e.g. Spaghetti Bolognese"
          error={state?.errors?.mealName?.[0]}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Who ate this?</Label>
        <div className="flex flex-wrap gap-2">
          {familyMembers.map(member => (
            <label key={member.id} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="memberIds" value={member.id} defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="text-sm">{member.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="calories">Calories (optional)</Label>
          <Input id="calories" name="calories" type="number" min="0" placeholder="450" defaultValue={defaultCalories ?? ''} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="budget">Cost £ (optional)</Label>
          <Input id="budget" name="budget" type="number" min="0" step="0.01" placeholder="8.50" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input id="rating" name="rating" type="number" min="1" max="5" placeholder="4" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Input id="notes" name="notes" placeholder="How was it? Any tweaks?" />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Log meal'}
        </Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
