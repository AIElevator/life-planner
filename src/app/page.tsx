import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import {
  ChevronRight,
  UtensilsCrossed,
  Dumbbell,
  Heart,
  Sparkles,
  TrendingUp,
  Users,
  MessageCircle,
  CheckCircle,
  Zap,
  BookOpen,
  Scale,
} from 'lucide-react'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-emerald-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-900/50">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white">Life Planner</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-emerald-300 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Get started <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-teal-400 blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-emerald-400 blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-600 blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/60 border border-emerald-600/40 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Claude AI
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Lose weight.{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Build habits.
            </span>
            <br />Feel unstoppable.
          </h1>

          <p className="text-xl text-emerald-200/80 max-w-2xl mx-auto leading-relaxed mb-10">
            AI-powered meal planning and fitness tracking designed for men serious about weight loss.
            Log your food, share your diary with ManvFat, and get personalised advice — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-8 py-4 text-base font-bold text-emerald-950 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-900/50 hover:-translate-y-0.5"
            >
              Start for free <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-emerald-900/40 px-8 py-4 text-base font-semibold text-emerald-200 hover:bg-emerald-800/60 transition-all"
            >
              Sign in
            </Link>
          </div>

          <p className="text-sm text-emerald-500">Free to use · No credit card required</p>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-emerald-800/60 pt-10">
            {[
              { value: 'AI', label: 'Meal suggestions' },
              { value: '7pm', label: 'WhatsApp reminders' },
              { value: '0 kit', label: 'Home workouts' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-xs text-emerald-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ManvFat callout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="text-emerald-200 text-sm font-semibold uppercase tracking-wider mb-3">Built for ManvFat</div>
              <h2 className="text-3xl font-extrabold leading-tight mb-4">
                Share your food diary in one tap
              </h2>
              <p className="text-emerald-100 leading-relaxed">
                Generate a shareable link to your week&apos;s food diary and paste it straight into WhatsApp for your ManvFat club owner — no screenshots, no faff.
              </p>
            </div>
            <div className="shrink-0 text-center">
              <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-5xl mb-3 mx-auto">
                📋
              </div>
              <p className="text-emerald-200 text-sm font-medium">Weekly diary link</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Everything you need to succeed</h2>
            <p className="text-gray-500 mt-3 text-lg">Designed around real weight loss science — not gimmicks</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Sparkles,
                gradient: 'from-violet-500 to-purple-600',
                bg: 'bg-violet-50',
                ring: 'ring-violet-100',
                title: 'AI meal suggestions',
                description: 'Tell Claude who\'s eating, your budget, and preferences — get perfectly tailored meal ideas in seconds.',
              },
              {
                icon: UtensilsCrossed,
                gradient: 'from-emerald-500 to-teal-600',
                bg: 'bg-emerald-50',
                ring: 'ring-emerald-100',
                title: 'Food diary logging',
                description: 'Track meals with calories, cost, and ratings. Build a food history that helps Claude get smarter over time.',
              },
              {
                icon: Scale,
                gradient: 'from-blue-500 to-indigo-600',
                bg: 'bg-blue-50',
                ring: 'ring-blue-100',
                title: 'Weekly weigh-in',
                description: 'Log your weight each week and track your progress with clear charts. See exactly how far you\'ve come.',
              },
              {
                icon: Zap,
                gradient: 'from-amber-500 to-orange-500',
                bg: 'bg-amber-50',
                ring: 'ring-amber-100',
                title: 'Home workouts',
                description: '12 no-equipment exercises with step-by-step guidance and three ready-made workout plans.',
              },
              {
                icon: BookOpen,
                gradient: 'from-teal-500 to-cyan-600',
                bg: 'bg-teal-50',
                ring: 'ring-teal-100',
                title: 'Evidence-based advice',
                description: 'A science-backed weight loss guide covering nutrition, supplements that actually work, and what to avoid.',
              },
              {
                icon: MessageCircle,
                gradient: 'from-green-500 to-emerald-600',
                bg: 'bg-green-50',
                ring: 'ring-green-100',
                title: 'WhatsApp reminders',
                description: 'Get a 7pm nudge on any day you haven\'t logged your food. The simple habit that makes the biggest difference.',
              },
            ].map(({ icon: Icon, gradient, bg, ring, title, description }) => (
              <div key={title} className={`bg-white rounded-2xl border border-gray-100 ring-1 ${ring} p-6 hover:shadow-lg transition-all group`}>
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Get started in minutes</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up free, add your household members, and set your food preferences.', icon: Users },
              { step: '2', title: 'Log your meals', desc: 'Track what you eat each day. Get WhatsApp reminders so you never miss a day.', icon: UtensilsCrossed },
              { step: '3', title: 'Share & win', desc: 'Generate your weekly ManvFat diary link and send it straight to your club owner.', icon: TrendingUp },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Step {step}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {[
              '✓ Free to use',
              '✓ No credit card',
              '✓ AI-powered suggestions',
              '✓ WhatsApp reminders',
              '✓ ManvFat ready',
            ].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-950 to-teal-900">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Ready to make this your best week yet?
          </h2>
          <p className="text-emerald-300 text-lg">
            Start logging, start losing, start winning.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-10 py-4 text-base font-bold text-emerald-950 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-900/50 hover:-translate-y-0.5"
          >
            Create your free account <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="text-emerald-600 text-sm">Free forever · No credit card needed</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 border-t border-emerald-900 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-emerald-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-emerald-400">Life Planner</span>
          </div>
          <p>Built with Claude AI · Made for men who mean business</p>
        </div>
      </footer>
    </main>
  )
}
