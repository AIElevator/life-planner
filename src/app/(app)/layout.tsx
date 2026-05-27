import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { headers } from 'next/headers'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Sidebar, MobileNav } from '@/components/nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  // Log visit after response is sent — does not block page render
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim()
    ?? headersList.get('x-real-ip')
    ?? 'unknown'

  after(async () => {
    await prisma.visit.create({ data: { ip } })
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName={session.name} />
      <main className="md:pl-64">
        <div className="max-w-4xl mx-auto p-5 pb-24 md:pb-5">
          {children}
        </div>
      </main>
      <MobileNav userName={session.name} />
    </div>
  )
}
