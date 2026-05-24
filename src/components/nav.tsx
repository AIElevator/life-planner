'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UtensilsCrossed,
  Dumbbell,
  Heart,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/meals', label: 'Meals', icon: UtensilsCrossed },
  { href: '/exercise', label: 'Exercise', icon: Dumbbell },
  { href: '/preferences', label: 'Preferences', icon: Heart },
  { href: '/family', label: 'Family', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ userName }: { userName: string | null }) {
  const pathname = usePathname()
  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'LP'

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40 bg-white border-r border-gray-100/80">
      {/* Subtle top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      {/* Logo / brand */}
      <div className="px-5 py-5 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md shadow-emerald-200/60" />
            <div className="relative w-full h-full flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-white drop-shadow-sm" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm tracking-tight leading-tight">Life Planner</p>
            <p className="text-[11px] text-gray-400 truncate max-w-[9rem] leading-tight mt-0.5">
              {userName ?? 'Welcome back'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-300 select-none">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-gradient-to-r from-emerald-50 to-teal-50/60 text-emerald-700 shadow-sm shadow-emerald-100/50'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  )}
                >
                  {/* Icon container */}
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150',
                      active
                        ? 'bg-emerald-500 shadow-sm shadow-emerald-300/50'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-3.5 w-3.5 transition-colors',
                        active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      )}
                    />
                  </span>

                  <span className="flex-1 truncate">{label}</span>

                  {active && (
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 pt-3 border-t border-gray-100/80 space-y-1">
        {/* Avatar row */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 mb-1.5">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
              <span className="text-[11px] font-bold text-white leading-none">{initials}</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
              {userName ?? 'User'}
            </p>
            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Free plan</p>
          </div>
        </div>

        {/* Sign out */}
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors">
              <LogOut className="h-3.5 w-3.5 transition-colors" />
            </span>
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}

export function MobileNav({ userName }: { userName: string | null }) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100/80 safe-area-inset-bottom">
      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

      {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 pt-3 pb-4 text-[10px] font-medium transition-all duration-150',
              active ? 'text-emerald-600' : 'text-gray-400'
            )}
          >
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150',
                active
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm shadow-emerald-100'
                  : ''
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-all duration-150',
                  active ? 'text-emerald-600 scale-110' : 'text-gray-400'
                )}
              />
            </span>
            <span className={cn('transition-colors', active ? 'font-semibold text-emerald-600' : '')}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
