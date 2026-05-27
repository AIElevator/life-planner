'use server'

import { redirect } from 'next/navigation'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import type { FormState } from '@/lib/definitions'

export async function requestPasswordReset(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase()

  if (!email || !email.includes('@')) {
    return { errors: { email: ['Please enter a valid email address'] } }
  }

  const user = await prisma.user.findUnique({ where: { email } })

  // Always show success to prevent email enumeration
  if (!user) {
    return { success: true }
  }

  // Invalidate any existing tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

  // Create a new token (expires in 1 hour)
  const token = crypto.randomBytes(32).toString('hex')
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  })

  try {
    await sendPasswordResetEmail(email, token)
  } catch (err) {
    console.error('Failed to send password reset email:', err)
    return { message: 'Failed to send reset email. Please try again later.' }
  }

  return { success: true }
}

export async function resetPassword(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const token = (formData.get('token') as string)?.trim()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!token) {
    return { message: 'Invalid or missing reset token.' }
  }

  if (!password || password.length < 8) {
    return { errors: { password: ['Password must be at least 8 characters'] } }
  }

  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { errors: { password: ['Password must contain at least one letter and one number'] } }
  }

  if (password !== confirmPassword) {
    return { errors: { confirmPassword: ['Passwords do not match'] } }
  }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { message: 'This reset link has expired or already been used. Please request a new one.' }
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashed },
  })

  await prisma.passwordResetToken.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  })

  redirect('/login?reset=1')
}
