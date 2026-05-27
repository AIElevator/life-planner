import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import {
  ChevronRight,
  UtensilsCrossed,
  Sparkles,
  TrendingUp,
  Users,
  MessageCircle,
  Zap,
  BookOpen,
  Scale,
  CheckCircle,
  Flame,
  Clock,
} from 'lucide-react'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-900/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Life Planner</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-emerald-300 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Get started <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — two-column */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: text + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/70 border border-emerald-700/50 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Claude AI
            </div>

            <h1 className="text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Lose weight.<br />
              <span className="text-emerald-400">Build habits.</span><br />
              Feel unstoppable.
            </h1>

            <p className="text-lg text-emerald-200/75 leading-relaxed mb-8 max-w-lg">
              AI meal planning and food tracking built for <strong className="text-emerald-300 font-semibold">ManvFat members</strong>. Log meals, share your diary with your club owner, and finally make weight loss stick.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-7 py-3.5 text-base font-bold text-emerald-950 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-900/40"
              >
                Start for free <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 px-7 py-3.5 text-base font-semibold text-emerald-300 hover:bg-emerald-800/50 transition-all"
              >
                Sign in
              </Link>
            </div>

            <p className="text-sm text-emerald-600">Free to use · No credit card required</p>

            {/* Trust signals */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                '25 healthy recipes',
                '7pm WhatsApp reminders',
                '12 home workouts',
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: app preview card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-emerald-400/10 blur-3xl rounded-3xl" />

              {/* Mock app UI */}
              <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-white font-semibold text-sm">Good evening, Dave 👋</p>
                    <p className="text-emerald-400 text-xs">Tuesday — time to log dinner</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
                    <span className="text-emerald-300 text-xs font-bold">D</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'This week', value: '−1.2 kg', colour: 'text-emerald-400' },
                    { label: 'Calories today', value: '1,840', colour: 'text-white' },
                    { label: 'Streak', value: '6 days', colour: 'text-amber-400' },
                  ].map(({ label, value, colour }) => (
                    <div key={label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                      <p className={`text-base font-bold ${colour}`}>{value}</p>
                      <p className="text-emerald-500 text-[10px] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent meals */}
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-xs font-semibold text-emerald-400 mb-2">Today&apos;s meals</p>
                  <div className="space-y-2">
                    {[
                      { emoji: '🥣', name: 'Overnight Oats', cal: 380, time: '8am' },
                      { emoji: '🥗', name: 'Chicken Caesar Wrap', cal: 520, time: '1pm' },
                      { emoji: '🍝', name: 'Turkey Bolognese', cal: 620, time: '7pm' },
                    ].map(({ emoji, name, cal, time }) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{emoji}</span>
                          <span className="text-white text-xs font-medium">{name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-500">
                          <span className="flex items-center gap-0.5"><Flame className="h-2.5 w-2.5 text-orange-400" />{cal}</span>
                          <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI suggestion pill */}
                <div className="rounded-xl bg-violet-900/40 border border-violet-700/40 p-3 flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-violet-200 text-xs font-semibold">AI suggestion for tomorrow</p>
                    <p className="text-violet-300/70 text-[11px] mt-0.5">Try Baked Salmon with veg — high protein, only 480 kcal, takes 25 min.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="h-16 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ManvFat callout */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-3">Built for ManvFat</div>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                Share your food diary in one tap
              </h2>
              <p className="text-emerald-100/90 leading-relaxed text-sm md:text-base">
                Generate a shareable link to your week&apos;s food diary and paste it straight into WhatsApp for your club owner — no screenshots, no faff.
              </p>
            </div>
            <div className="shrink-0 text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl mb-3 mx-auto">📋</div>
              <p className="text-emerald-200 text-sm font-medium">Weekly diary link</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Everything you need to succeed</h2>
            <p className="text-gray-500 mt-2 text-base">Designed around real weight loss science — not gimmicks</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Sparkles,
                colour: 'bg-violet-100 text-violet-600',
                title: 'AI meal suggestions',
                description: 'Tell Claude who\'s eating, your budget, and preferences — get perfectly tailored meal ideas in seconds.',
              },
              {
                icon: UtensilsCrossed,
                colour: 'bg-emerald-100 text-emerald-600',
                title: 'Food diary & recipe library',
                description: '25 healthy, tasty recipes to browse. Log meals with calories, cost, and ratings in seconds.',
              },
              {
                icon: Scale,
                colour: 'bg-blue-100 text-blue-600',
                title: 'Weekly weigh-in tracker',
                description: 'Log your weight each week and see your progress at a glance. Know exactly how far you\'ve come.',
              },
              {
                icon: Zap,
                colour: 'bg-amber-100 text-amber-600',
                title: 'Home workouts',
                description: '12 no-equipment exercises with step-by-step guidance and three ready-made workout plans.',
              },
              {
                icon: BookOpen,
                colour: 'bg-teal-100 text-teal-600',
                title: 'Evidence-based advice',
                description: 'A science-backed weight loss guide covering nutrition, supplements that work, and what to avoid.',
              },
              {
                icon: MessageCircle,
                colour: 'bg-green-100 text-green-600',
                title: 'WhatsApp reminders',
                description: 'A 7pm nudge on any day you haven\'t logged your food. The simple habit that makes the biggest difference.',
              },
            ].map(({ icon: Icon, colour, title, description }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${colour} flex items-center justify-center mb-4`}>
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Get started in minutes</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up free, add your family, and set your food preferences.', icon: Users },
              { step: '2', title: 'Log your meals', desc: 'Track what you eat each day. Get WhatsApp reminders so you never forget.', icon: UtensilsCrossed },
              { step: '3', title: 'Share & win', desc: 'Generate your weekly ManvFat diary link and send it to your club owner.', icon: TrendingUp },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-200">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1.5">Step {step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-950 to-teal-900">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Ready to make this your best week yet?
          </h2>
          <p className="text-emerald-300">Start logging, start losing, start winning.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-10 py-4 text-base font-bold text-emerald-950 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-900/50"
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
