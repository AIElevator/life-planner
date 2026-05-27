import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AddTaskForm } from './_components/add-task-form'
import { TaskList } from './_components/task-list'
import { ClipboardList, UserCheck, CheckCircle2 } from 'lucide-react'

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const session = await requireAuth()
  const params  = await searchParams
  const tab     = (params.tab ?? 'open') as 'open' | 'delegated' | 'completed'

  const [tasks] = await Promise.all([
    prisma.task.findMany({
      where:   { userId: session.id },
      include: { contact: true },
      orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
    }),
  ])

  const open      = tasks.filter((t) => t.status === 'open')
  const delegated = tasks.filter((t) => t.status === 'delegated')
  const completed = tasks.filter((t) => t.status === 'completed')

  const tabs = [
    { key: 'open',      label: 'My tasks',  icon: ClipboardList,  count: open.length,      colour: 'text-emerald-600' },
    { key: 'delegated', label: 'Delegated', icon: UserCheck,      count: delegated.length, colour: 'text-blue-600' },
    { key: 'completed', label: 'Completed', icon: CheckCircle2,   count: completed.length, colour: 'text-gray-400' },
  ]

  const current = tab === 'delegated' ? delegated : tab === 'completed' ? completed : open

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-gray-500 text-sm mt-1">
          {open.length} open · {delegated.length} delegated
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(({ key, label, icon: Icon, count, colour }) => (
          <a
            key={key}
            href={`/tasks?tab=${key}`}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === key
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className={`h-4 w-4 ${tab === key ? colour : ''}`} />
            {label}
            {count > 0 && (
              <span className={`text-xs font-semibold rounded-full px-1.5 py-0.5 ${
                tab === key ? `bg-gray-100 ${colour}` : 'bg-gray-200 text-gray-500'
              }`}>
                {count}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Add task (open tab only) */}
      {tab === 'open' && <AddTaskForm />}

      {/* Task list */}
      <TaskList tasks={current as Parameters<typeof TaskList>[0]['tasks']} variant={tab} />
    </div>
  )
}
