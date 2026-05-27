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
} from 'lucide-react'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-white/5">
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #34d399, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Life Planner</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/login" className="text-sm font-medium text-emerald-300 hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors">
              Get started <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #022c22 0%, #064e3b 50%, #0f766e 100%)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/60 bg-emerald-900/60 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Claude AI
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.02em', color: 'white', marginBottom: '24px' }}>
            Lose weight.<br />
            <span style={{ color: '#6ee7b7' }}>Build habits.</span><br />
            Feel unstoppable.
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'rgba(167,243,208,0.8)', lineHeight: '1.7', marginBottom: '40px', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto' }}>
            AI meal planning and food tracking built for <strong style={{ color: '#6ee7b7', fontWeight: 600 }}>ManvFat members</strong>. Log meals, share your diary with your club owner, and make weight loss stick.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
            <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#34d399', color: '#022c22', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
              Start for free <ChevronRight className="h-4 w-4" />
            </Link>
            <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(52,211,153,0.3)', color: '#a7f3d0', padding: '14px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
              Sign in
            </Link>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#059669' }}>Free to use · No credit card required</p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '48px', paddingTop: '40px', borderTop: '1px solid rgba(52,211,153,0.15)' }}>
            {['25 healthy recipes', '7pm WhatsApp reminders', '12 home workouts', 'AI meal suggestions'].map((item) => (
              <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#6ee7b7', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 500 }}>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ManvFat callout */}
      <section style={{ padding: '64px 24px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ borderRadius: '24px', background: 'linear-gradient(135deg, #059669, #0d9488)', padding: '40px 48px', color: 'white', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            <div style={{ maxWidth: '480px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a7f3d0', marginBottom: '12px' }}>Built for ManvFat</p>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>Share your food diary in one tap</h2>
              <p style={{ color: 'rgba(236,253,245,0.85)', lineHeight: 1.65, fontSize: '0.9375rem' }}>
                Generate a shareable link to your week&apos;s food diary and paste it straight into WhatsApp for your club owner — no screenshots, no faff.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 8px' }}>📋</div>
              <p style={{ fontSize: '0.875rem', color: '#a7f3d0', fontWeight: 500 }}>Weekly diary link</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', marginBottom: '8px' }}>Everything you need to succeed</h2>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>Built around real weight loss science — not gimmicks</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: Sparkles, colour: '#7c3aed', bg: '#f5f3ff', title: 'AI meal suggestions', description: "Tell Claude who's eating, your budget, and preferences — get tailored meal ideas in seconds." },
              { icon: UtensilsCrossed, colour: '#059669', bg: '#ecfdf5', title: 'Recipe library & diary', description: '25 healthy recipes to browse. Log meals with calories, cost, and ratings in seconds.' },
              { icon: Scale, colour: '#2563eb', bg: '#eff6ff', title: 'Weekly weigh-in', description: "Log your weight each week and see your progress at a glance. See exactly how far you've come." },
              { icon: Zap, colour: '#d97706', bg: '#fffbeb', title: 'Home workouts', description: '12 no-equipment exercises with step-by-step guidance and three ready-made workout plans.' },
              { icon: BookOpen, colour: '#0891b2', bg: '#ecfeff', title: 'Evidence-based advice', description: 'Science-backed guide covering nutrition, supplements that work, and what to avoid.' },
              { icon: MessageCircle, colour: '#16a34a', bg: '#f0fdf4', title: 'WhatsApp reminders', description: "A 7pm nudge on days you haven't logged food. The simple habit that makes the biggest difference." },
            ].map(({ icon: Icon, colour, bg, title, description }) => (
              <div key={title} style={{ background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Icon style={{ width: '18px', height: '18px', color: colour }} strokeWidth={2} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: '6px', fontSize: '0.9375rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '64px 24px', background: 'white' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '48px' }}>Get started in minutes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up free, add your family, and set food preferences.', icon: Users },
              { step: '2', title: 'Log your meals', desc: 'Track daily meals. Get WhatsApp reminders so you never forget.', icon: UtensilsCrossed },
              { step: '3', title: 'Share & win', desc: 'Send your weekly ManvFat diary link straight to your club owner.', icon: TrendingUp },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(5,150,105,0.25)' }}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Step {step}</p>
                <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #022c22, #0f766e)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Ready to make this your best week yet?
          </h2>
          <p style={{ color: '#6ee7b7', marginBottom: '32px', fontSize: '1.0625rem' }}>Start logging, start losing, start winning.</p>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#34d399', color: '#022c22', padding: '16px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            Create your free account <ChevronRight className="h-4 w-4" />
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#065f46', marginTop: '16px' }}>Free forever · No credit card needed</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#022c22', borderTop: '1px solid rgba(52,211,153,0.1)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #34d399, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span style={{ fontWeight: 600, color: '#6ee7b7', fontSize: '0.875rem' }}>Life Planner</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#065f46' }}>Built with Claude AI · Made for men who mean business</p>
        </div>
      </footer>
    </main>
  )
}
