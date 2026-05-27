'use client'

import { Suspense } from 'react'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { resetPassword } from '@/actions/password-reset'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UtensilsCrossed, ArrowLeft, Loader2 } from 'lucide-react'

function ResetPasswordInner() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const [state, action, pending] = useActionState(resetPassword, undefined)

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-8">
        <div className="w-full max-w-sm space-y-4 text-center">
          <p className="text-gray-600">This reset link is invalid or has expired.</p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Request a new link
          </Link>
        </div>
      </main>
    )
  }

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

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Choose a new password</h1>
          <p className="mt-1 text-gray-500 text-sm">Must be at least 8 characters with a letter and a number.</p>
        </div>

        <form action={action} className="space-y-4">
          {/* Hidden token */}
          <input type="hidden" name="token" value={token} />

          {state?.message && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {state.message}{' '}
              {state.message.includes('expired') && (
                <Link href="/forgot-password" className="underline font-medium">
                  Request a new one
                </Link>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              New password
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Same password again"
              error={state?.errors?.confirmPassword?.[0]}
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
                Updating…
              </>
            ) : (
              'Update password'
            )}
          </button>
        </form>

        <Link
          href="/login"
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  )
}
