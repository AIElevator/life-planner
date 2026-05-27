import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { Sidebar, MobileNav } from '@/components/nav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar userName={session.name} />
      <main style={{ paddingLeft: '256px' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '20px', paddingBottom: '20px' }}>
          {children}
        </div>
      </main>
      <MobileNav userName={session.name} />
    </div>
  )
}
