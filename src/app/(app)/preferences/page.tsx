import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddPreferenceForm } from './_components/add-preference-form'
import { deleteFoodPreference } from '@/actions/preferences'
import { Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function PreferencesPage() {
  const session = await requireAuth()

  const preferences = await prisma.foodPreference.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'desc' },
  })

  const likes = preferences.filter(p => p.preference === 'like')
  const dislikes = preferences.filter(p => p.preference === 'dislike')
  const allergies = preferences.filter(p => p.preference === 'allergy')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Food preferences</h1>
        <p className="text-gray-500 text-sm mt-1">
          Tell us what you love and what to avoid — Claude will use this when suggesting meals.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add preference</CardTitle>
        </CardHeader>
        <CardContent>
          <AddPreferenceForm />
        </CardContent>
      </Card>

      {allergies.length > 0 && (
        <PreferenceGroup title="Allergies & intolerances" items={allergies} colour="red" />
      )}
      {dislikes.length > 0 && (
        <PreferenceGroup title="Dislikes" items={dislikes} colour="orange" />
      )}
      {likes.length > 0 && (
        <PreferenceGroup title="Favourites" items={likes} colour="emerald" />
      )}

      {preferences.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Heart className="h-8 w-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No preferences added yet</p>
            <p className="text-xs text-gray-400 mt-1">Add foods you love, hate, or are allergic to</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

type PrefItem = { id: string; foodName: string; notes: string | null; preference: string }

function PreferenceGroup({ title, items, colour }: { title: string; items: PrefItem[]; colour: string }) {
  const colours: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    red: 'bg-red-50 text-red-700 border-red-100',
  }
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <div key={item.id} className={cn('flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm', colours[colour])}>
              <span>{item.foodName}</span>
              <form action={deleteFoodPreference.bind(null, item.id)}>
                <button type="submit" className="opacity-50 hover:opacity-100 transition-opacity">
                  <X className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
