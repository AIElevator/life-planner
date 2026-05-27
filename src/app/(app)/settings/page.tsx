import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import { saveWhatsappSettings, saveGoals } from '@/actions/settings'

const daysOfWeek = [
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
  { value: '0', label: 'Sunday' },
]

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
          <CardDescription>Update names and ages for accurate meal suggestions</CardDescription>
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

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">🎯 Your goals</CardTitle>
          <CardDescription>
            Set your daily targets and ManvFat schedule. These drive the calorie ring on your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={saveGoals} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="dailyCalorieTarget">Daily calorie target (kcal)</Label>
                <Input
                  id="dailyCalorieTarget"
                  name="dailyCalorieTarget"
                  type="number"
                  defaultValue={user?.dailyCalorieTarget ?? 2000}
                  min="1000"
                  max="5000"
                  step="50"
                />
                <p className="text-xs text-gray-400">Most men losing weight aim for 1,500–2,000 kcal.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dailyProteinTarget">Daily protein target (g)</Label>
                <Input
                  id="dailyProteinTarget"
                  name="dailyProteinTarget"
                  type="number"
                  defaultValue={user?.dailyProteinTarget ?? 150}
                  min="50"
                  max="400"
                  step="5"
                />
                <p className="text-xs text-gray-400">Aim for 1.6–2.2g per kg of bodyweight.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="weighInDay">ManvFat weigh-in day</Label>
                <select
                  id="weighInDay"
                  name="weighInDay"
                  defaultValue={user?.weighInDay ?? ''}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Not set</option>
                  {daysOfWeek.map((d) => (
                    <option key={d.value} value={d.label.toLowerCase()}>{d.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400">The app will remind you the evening before.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="matchDayOfWeek">Football match day</Label>
                <select
                  id="matchDayOfWeek"
                  name="matchDayOfWeek"
                  defaultValue={user?.matchDayOfWeek !== null && user?.matchDayOfWeek !== undefined ? String(user.matchDayOfWeek) : ''}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Not set</option>
                  {daysOfWeek.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400">You&apos;ll get a pre-match meal nudge on this day.</p>
              </div>
            </div>

            <Button type="submit" variant="outline" size="sm">Save goals</Button>
          </form>
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
            Just add your number. No extra setup needed.
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
                UK example: 447700900123. Include the country code with no + or spaces.
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
          <p className="text-xs text-gray-400">To delete your account, contact support. You can change your password via the <a href="/forgot-password" className="underline hover:text-gray-600">forgot password</a> link on the sign-in page.</p>
        </CardContent>
      </Card>
    </div>
  )
}
