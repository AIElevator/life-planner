import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed, Dumbbell, Heart, ChevronRight } from 'lucide-react'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white mb-2">
            <UtensilsCrossed className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Life Planner</h1>
          <p className="text-lg text-gray-500">
            AI-powered meal planning, nutrition tracking, and fitness logging for your whole family.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          {[
            { icon: UtensilsCrossed, label: 'Smart meal suggestions' },
            { icon: Dumbbell, label: 'Exercise tracking' },
            { icon: Heart, label: 'Food preferences' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Icon className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/signup">
              Get started <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
