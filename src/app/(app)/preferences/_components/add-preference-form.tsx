'use client'

import { useActionState } from 'react'
import { addFoodPreference } from '@/actions/preferences'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddPreferenceForm() {
  const [state, action, pending] = useActionState(addFoodPreference, undefined)

  return (
    <form action={action} className="space-y-4">
      {state?.success && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
          Preference added!
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-40 space-y-1.5">
          <Label htmlFor="foodName">Food or ingredient</Label>
          <Input
            id="foodName"
            name="foodName"
            placeholder="e.g. Chicken, Broccoli, Nuts"
            error={state?.errors?.foodName?.[0]}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="preference">I…</Label>
          <select
            name="preference"
            className="flex h-10 w-36 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="like">Love it</option>
            <option value="dislike">Dislike it</option>
            <option value="allergy">Am allergic</option>
          </select>
        </div>
        <div className="flex-1 min-w-40 space-y-1.5">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Input id="notes" name="notes" placeholder="e.g. only when well cooked" />
        </div>
      </div>

      <Button type="submit" disabled={pending} size="sm">
        {pending ? 'Adding…' : 'Add preference'}
      </Button>
    </form>
  )
}
