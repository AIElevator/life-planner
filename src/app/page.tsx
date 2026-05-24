import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { ChevronRight, UtensilsCrossed, Dumbbell, Heart, Sparkles, Star, TrendingUp } from 'lucide-react'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Life Planner</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Get started <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Claude AI
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Eat well, move more,{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              feel great
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your AI-powered family meal planner and fitness companion. Get personalised meal suggestions, log workouts, and build healthy habits together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Start for free <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Sign in
            </Link>
          </div>

          <p className="text-sm text-gray-400">Free to use · No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Everything your family needs</h2>
            <p className="text-gray-500 mt-3">One app for meals, nutrition, and fitness</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                colour: 'from-violet-500 to-purple-600',
                bg: 'bg-violet-50',
                title: 'AI meal suggestions',
                description: 'Tell Claude who\'s eating and get perfectly tailored meal ideas based on your preferences, budget, and what you\'ve eaten recently.',
              },
              {
                icon: UtensilsCrossed,
                colour: 'from-emerald-500 to-teal-600',
                bg: 'bg-emerald-50',
                title: 'Meal logging',
                description: 'Track every meal with calories, cost, and ratings. See patterns in what your family loves and build a personal recipe collection.',
              },
              {
                icon: Dumbbell,
                colour: 'from-blue-500 to-indigo-600',
                bg: 'bg-blue-50',
                title: 'Exercise tracker',
                description: 'Log workouts, track duration and intensity, and see your weekly calorie burn at a glance.',
              },
              {
                icon: Heart,
                colour: 'from-rose-500 to-pink-600',
                bg: 'bg-rose-50',
                title: 'Food preferences',
                description: 'Log what you love, hate, or are allergic to. Claude remembers your preferences and never suggests something you don\'t like.',
              },
              {
                icon: TrendingUp,
                colour: 'from-amber-500 to-orange-600',
                bg: 'bg-amber-50',
                title: 'Progress tracking',
                description: 'See your nutrition and exercise trends over time. Build consistent healthy habits with clear visual feedback.',
              },
              {
                icon: Star,
                colour: 'from-teal-500 to-cyan-600',
                bg: 'bg-teal-50',
                title: 'Family profiles',
                description: 'Add all household members with their ages. Claude tailors suggestions to suit everyone from teenagers to adults.',
              },
            ].map(({ icon: Icon, colour, bg, title, description }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-md transition-all group">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colour} flex items-center justify-center shadow-sm`}>
                    <Icon className="h-4.5 w-4.5 text-white" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Ready to eat better?</h2>
          <p className="text-gray-500">Join families using Life Planner to make healthier choices every day.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
          >
            Create your free account <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <UtensilsCrossed className="h-3 w-3 text-white" />
            </div>
            <span className="font-medium text-gray-600">Life Planner</span>
          </div>
          <p>Built with Claude AI</p>
        </div>
      </footer>
    </main>
  )
}
