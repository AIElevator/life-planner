'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/auth'
import { SignupSchema, LoginSchema, type FormState } from '@/lib/definitions'

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const validated = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { name, email, password } = validated.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { errors: { email: ['An account with this email already exists'] } }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })

  // Create default family members for this user
  await prisma.familyMember.createMany({
    data: [
      { userId: user.id, name: name || 'You', age: 53, relationship: 'self', isDefault: true },
      { userId: user.id, name: 'Son 1', age: 17, relationship: 'son', isDefault: true },
      { userId: user.id, name: 'Son 2', age: 16, relationship: 'son', isDefault: true },
    ],
  })

  await createSession({ id: user.id, name: user.name, email: user.email })
  redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { email, password } = validated.data
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { errors: { email: ['No account found with this email address'] } }
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return { errors: { password: ['Incorrect password'] } }
  }

  await createSession({ id: user.id, name: user.name, email: user.email })
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
