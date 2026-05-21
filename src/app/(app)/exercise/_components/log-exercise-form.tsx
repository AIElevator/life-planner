'use client'

import { useActionState } from 'react'
import { logExercise } from '@/actions/exercise'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'

export function LogExerciseForm() {
  const [state, action, pending] = useActionState(logExercise, undefined)

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
          <Label htmlFor="durationMinutes">Duration (minutes)</Label>
          <Input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min="1"
            placeholder="30"
            error={state?.errors?.durationMinutes?.[0]}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="exerciseType">Exercise type</Label>
        <Input
          id="exerciseType"
          name="exerciseType"
          placeholder="e.g. Running, Cycling, Swimming, Weights"
          error={state?.errors?.exerciseType?.[0]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="intensity">Intensity</Label>
          <select
            name="intensity"
            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select intensity</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="caloriesBurned">Calories burned (optional)</Label>
          <Input
            id="caloriesBurned"
            name="caloriesBurned"
            type="number"
            min="0"
            placeholder="250"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Input id="notes" name="notes" placeholder="How did it feel?" />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save exercise'}
        </Button>
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
