import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users, User } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function addMember(formData: FormData) {
  'use server'
  const { requireAuth: req } = await import('@/lib/auth')
  const { prisma: db } = await import('@/lib/prisma')
  const session = await req()

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string)
  const relationship = formData.get('relationship') as string

  if (!name || !age || !relationship) return

  await db.familyMember.create({
    data: { userId: session.id, name, age, relationship },
  })
  revalidatePath('/family')
}

async function removeMember(formData: FormData) {
  'use server'
  const { requireAuth: req } = await import('@/lib/auth')
  const { prisma: db } = await import('@/lib/prisma')
  const session = await req()
  const id = formData.get('id') as string
  await db.familyMember.delete({ where: { id, userId: session.id } })
  revalidatePath('/family')
}

export default async function FamilyPage() {
  const session = await requireAuth()

  const members = await prisma.familyMember.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'asc' },
  })

  const relationshipLabels: Record<string, string> = {
    self: 'You',
    son: 'Son',
    daughter: 'Daughter',
    partner: 'Partner',
    other: 'Other',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Family members</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage who eats together — Claude uses ages and relationships when suggesting meals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className="text-sm text-gray-500">
                  {member.age} years old · {relationshipLabels[member.relationship] ?? member.relationship}
                </p>
              </div>
              {!member.isDefault && (
                <form action={removeMember}>
                  <input type="hidden" name="id" value={member.id} />
                  <button type="submit" className="text-xs text-red-400 hover:text-red-600 transition-colors">
                    Remove
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            Add a family member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addMember} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="e.g. Emma" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" min="1" max="120" placeholder="25" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="relationship">Relationship</Label>
                <select
                  name="relationship"
                  className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="partner">Partner</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <Button type="submit" size="sm">Add member</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
