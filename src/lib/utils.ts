import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isYesterday } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isToday(d)) return 'Today'
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'd MMM yyyy')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
}

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const
export const EXERCISE_INTENSITY = ['low', 'moderate', 'high'] as const

export function getMealTypeLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function getIntensityColour(intensity: string): string {
  return intensity === 'high' ? 'text-red-500' : intensity === 'moderate' ? 'text-amber-500' : 'text-green-500'
}
