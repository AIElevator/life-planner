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
            {user?.whatsappNumber && user?.whatsappApiKey && (
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                ✓ Connected
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Get a WhatsApp message at 7pm if you haven&apos;t logged your food that day.
            Uses the free <strong>CallMeBot</strong> service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Setup instructions */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm space-y-2">
            <p className="font-semibold text-amber-800">One-time setup (takes 2 minutes):</p>
            <ol className="list-decimal list-inside space-y-1 text-amber-700">
              <li>Save this number in your contacts: <strong>+34 644 68 74 14</strong> (name it &quot;CallMeBot&quot;)</li>
              <li>Send this exact message to that number on WhatsApp:<br />
                <code className="bg-white/60 px-1.5 py-0.5 rounded text-xs font-mono">I allow callmebot to send me messages</code>
              </li>
              <li>You&apos;ll receive a reply with your <strong>API key</strong> — paste it below</li>
            </ol>
          </div>

          <form action={saveWhatsappSettings} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="whatsappNumber">WhatsApp number</Label>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  defaultValue={user?.whatsappNumber ?? ''}
                  placeholder="447700900123 (no + or spaces)"
                />
                <p className="text-xs text-gray-400">Include country code, no + or spaces</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="whatsappApiKey">CallMeBot API key</Label>
                <Input
                  id="whatsappApiKey"
                  name="whatsappApiKey"
                  defaultValue={user?.whatsappApiKey ?? ''}
                  placeholder="Paste the key from CallMeBot here"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" variant="outline" size="sm">Save reminder settings</Button>
              {user?.whatsappNumber && (
                <p className="text-xs text-gray-400">
                  Reminder will fire at 7pm each day you haven&apos;t logged any meals.
                </p>
              )}
            </div>
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
