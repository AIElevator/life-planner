'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UtensilsCrossed, ArrowRight, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined)

  const features = [
    'AI-powered meal suggestions',
    'Exercise & fitness tracking',
    'Family meal planning',
    'Food preferences & allergies',
  ]

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Left panel — decorative */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700">
        {/* Concentric rings */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/30"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        {/* Soft blobs */}
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/20">
              <UtensilsCrossed className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Life Planner</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Start your<br />
              health journey<br />
              today.
            </h2>
            <ul className="space-y-3">
              {features.map(f => (
                <li key={f} className="flex items-center gap-3 text-emerald-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <span className="text-xs text-white">✓</span>
                  </span>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-emerald-300">Free to use · No credit card needed</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Life Planner</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-1 text-gray-500">Free forever · No credit card needed</p>
          </div>

          <form action={action} className="space-y-4">
            {state?.message && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.message}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Your name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="David"
                error={state?.errors?.name?.[0]}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={state?.errors?.email?.[0]}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                error={state?.errors?.password?.[0]}
                required
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all duration-150 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
