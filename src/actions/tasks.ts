'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// ─── Tasks ────────────────────────────────────────────────────────────────────

export async function createTask(formData: FormData) {
  const session = await requireAuth()

  const title       = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const dueDateRaw  = formData.get('dueDate') as string
  const priority    = (formData.get('priority') as string) || 'medium'
  const contactId   = (formData.get('contactId') as string) || null

  if (!title) return { error: 'Title is required' }

  await prisma.task.create({
    data: {
      userId:      session.id,
      title,
      description,
      dueDate:     dueDateRaw ? new Date(dueDateRaw) : null,
      priority,
      contactId:   contactId || null,
    },
  })

  revalidatePath('/tasks')
}

export async function completeTask(taskId: string) {
  const session = await requireAuth()
  await prisma.task.updateMany({
    where: { id: taskId, userId: session.id },
    data:  { status: 'completed' },
  })
  revalidatePath('/tasks')
}

export async function reopenTask(taskId: string) {
  const session = await requireAuth()
  await prisma.task.updateMany({
    where: { id: taskId, userId: session.id },
    data:  { status: 'open', delegatedTo: null },
  })
  revalidatePath('/tasks')
}

export async function delegateTask(taskId: string, delegateTo: string) {
  const session = await requireAuth()
  await prisma.task.updateMany({
    where: { id: taskId, userId: session.id },
    data:  { status: 'delegated', delegatedTo: delegateTo.trim() },
  })
  revalidatePath('/tasks')
}

export async function deleteTask(taskId: string) {
  const session = await requireAuth()
  await prisma.task.deleteMany({
    where: { id: taskId, userId: session.id },
  })
  revalidatePath('/tasks')
}

export async function updateTaskContact(taskId: string, contactId: string | null) {
  const session = await requireAuth()
  await prisma.task.updateMany({
    where: { id: taskId, userId: session.id },
    data:  { contactId },
  })
  revalidatePath('/tasks')
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function createContact(formData: FormData) {
  const session = await requireAuth()

  const name    = (formData.get('name') as string)?.trim()
  const email   = (formData.get('email') as string)?.trim() || null
  const phone   = (formData.get('phone') as string)?.trim() || null
  const company = (formData.get('company') as string)?.trim() || null

  if (!name) return { error: 'Name is required' }

  const contact = await prisma.contact.create({
    data: { userId: session.id, name, email, phone, company },
  })

  revalidatePath('/tasks')
  return { contact }
}

export async function createContactQuick(name: string) {
  const session = await requireAuth()
  const contact = await prisma.contact.create({
    data: { userId: session.id, name: name.trim() },
  })
  revalidatePath('/tasks')
  return { contact }
}

export async function deleteContact(contactId: string) {
  const session = await requireAuth()
  await prisma.contact.deleteMany({
    where: { id: contactId, userId: session.id },
  })
  revalidatePath('/tasks')
}
