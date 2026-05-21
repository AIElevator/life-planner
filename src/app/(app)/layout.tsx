import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Sidebar, MobileNav } from '@/components/nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName={session.name} />
      <main className="md:pl-60">
        <div className="max-w-4xl mx-auto p-5 pb-24 md:pb-5">
          {children}
        </div>
      </main>
      <MobileNav userName={session.name} />
    </div>
  )
}
