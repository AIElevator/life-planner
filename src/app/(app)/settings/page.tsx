import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import { saveWhatsappSettings } from '@/actions/settings'

async function updateName(formData: FormData) {
  'use server'
  const { requireAuth: req } = await import('@/lib/auth')
  const { prisma: db } = await import('@/lib/prisma')
  const session = await req()
  const name = (formData.get('name') as string)?.trim()
  if (!name) return
  await db.user.update({ where: { id: session.id }, data: { name } })
  revalidatePath('/settings')
}

async function updateFamilyMemberName(formData: FormData) {
  'use server'
  const { requireAuth: req } = await import('@/lib/auth')
  const { prisma: db } = await import('@/lib/prisma')
  const session = await req()
  const id = formData.get('id') as string
  const name = (formData.get('name') as string)?.trim()
  const age = parseInt(formData.get('age') as string)
  if (!name || !id) return
  await db.familyMember.update({
    where: { id, userId: session.id },
    data: { name, ...(age ? { age } : {}) },
  })
  revalidatePath('/settings')
  revalidatePath('/family')
}

export default async function SettingsPage() {
  const session = await requireAuth()
  const user = await prisma.user.findUnique({ where: { id: session.id } })
  const members = await prisma.familyMember.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and household details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your profile</CardTitle>
          <CardDescription>Used in meal suggestions and personalisation</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateName} className="flex gap-4 items-end flex-wrap">
            <div className="space-y-1.5 flex-1 min-w-48">
              <Label htmlFor="name">Display name</Label>
              <Input id="name" name="name" defaultValue={user?.name ?? ''} placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <p className="text-sm text-gray-500 h-10 flex items-center">{user?.email}</p>
            </div>
            <Button type="submit" variant="outline" size="sm">Save name</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Household members</CardTitle>
          <CardDescription>Update names and ages so Claude gives accurate suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <form key={member.id} action={updateFamilyMemberName} className="flex gap-4 items-end flex-wrap">
                <input type="hidden" name="id" value={member.id} />
                <div className="space-y-1.5 flex-1 min-w-32">
                  <Label>Name</Label>
                  <Input name="name" defaultValue={member.name} placeholder="Name" />
                </div>
                <div className="space-y-1.5 w-24">
                  <Label>Age</Label>
                  <Input name="age" type="number" defaultValue={member.age} min="1" max="120" />
                </div>
                <div className="space-y-1.5">
                  <Label>Relationship</Label>
                  <p className="text-sm text-gray-500 h-10 flex items-center capitalize">{member.relationship}</p>
                </div>
                <Button type="submit" variant="outline" size="sm">Update</Button>
              </form>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            💬 WhatsApp reminders
            {user?.whatsappNumber && (
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                ✓ Active
              </span>
            )}
          </CardTitle>
          <CardDescription>
            You&apos;ll get a WhatsApp message at 7pm on any day you haven&apos;t logged your food.
            Just add your number — no extra setup needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={saveWhatsappSettings} className="space-y-4">
            <div className="max-w-xs space-y-1.5">
              <Label htmlFor="whatsappNumber">WhatsApp number</Label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                defaultValue={user?.whatsappNumber ?? ''}
                placeholder="447700900123"
              />
              <p className="text-xs text-gray-400">
                UK example: 447700900123 — include country code, no + or spaces.
                Leave blank to turn off reminders.
              </p>
            </div>
            <Button type="submit" variant="outline" size="sm">Save</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-base text-red-600">Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-3">Your account email: <strong>{user?.email}</strong></p>
          <p className="text-xs text-gray-400">To delete your account or change your password, contact support.</p>
        </CardContent>
      </Card>
    </div>
  )
}
