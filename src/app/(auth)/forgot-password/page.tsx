'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '@/actions/password-reset'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UtensilsCrossed, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined)

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-8">
      <div className="w-full max-w-sm space-y-7">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
            <UtensilsCrossed className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">Life Planner</span>
        </div>

        {state?.success ? (
          /* Success state */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Check your email</h1>
                <p className="text-sm text-gray-500">Reset link sent if the address is registered</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              If there&apos;s an account for that address, you&apos;ll receive a password reset email
              within a few minutes. Check your spam folder if it doesn&apos;t arrive.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </div>
        ) : (
          /* Form */
          <>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
              <p className="mt-1 text-gray-500 text-sm">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form action={action} className="space-y-4">
              {state?.message && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {state.message}
                </div>
              )}

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

              <button
                type="submit"
                disabled={pending}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all duration-150 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>

            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
