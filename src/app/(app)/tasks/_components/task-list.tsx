'use client'

import { useState } from 'react'
import { completeTask, deleteTask, reopenTask } from '@/actions/tasks'
import { DelegateModal } from './delegate-modal'
import { CheckCircle2, Circle, Trash2, UserCheck, RotateCcw, Calendar, Flag, User } from 'lucide-react'
import { format, isPast, isToday } from 'date-fns'

type Contact = { id: string; name: string; company: string | null }
type Task = {
  id: string
  title: string
  description: string | null
  dueDate: Date | null
  status: string
  priority: string
  delegatedTo: string | null
  contact: Contact | null
}

const priorityColour: Record<string, string> = {
  high:   'text-red-500 bg-red-50 border-red-100',
  medium: 'text-amber-600 bg-amber-50 border-amber-100',
  low:    'text-gray-400 bg-gray-50 border-gray-100',
}

const priorityDot: Record<string, string> = {
  high:   'bg-red-500',
  medium: 'bg-amber-400',
  low:    'bg-gray-300',
}

interface Props {
  tasks: Task[]
  variant: 'open' | 'delegated' | 'completed'
}

export function TaskList({ tasks, variant }: Props) {
  const [delegating, setDelegating] = useState<Task | null>(null)

  if (tasks.length === 0) {
    const empty: Record<string, string> = {
      open:      'No open tasks — you\'re all caught up! 🎉',
      delegated: 'Nothing delegated yet.',
      completed: 'No completed tasks yet.',
    }
    return (
      <p className="text-center text-sm text-gray-400 py-10">{empty[variant]}</p>
    )
  }

  return (
    <>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            variant={variant}
            onDelegate={() => setDelegating(task)}
          />
        ))}
      </ul>

      {delegating && (
        <DelegateModal
          taskId={delegating.id}
          taskTitle={delegating.title}
          onClose={() => setDelegating(null)}
        />
      )}
    </>
  )
}

function TaskRow({
  task,
  variant,
  onDelegate,
}: {
  task: Task
  variant: 'open' | 'delegated' | 'completed'
  onDelegate: () => void
}) {
  const [expanded, setExpanded]   = useState(false)
  const [completing, setCompleting] = useState(false)
  const [deleting, setDeleting]   = useState(false)

  const dueDate    = task.dueDate ? new Date(task.dueDate) : null
  const overdue    = dueDate && isPast(dueDate) && !isToday(dueDate) && variant === 'open'
  const dueToday   = dueDate && isToday(dueDate)

  async function handleComplete() {
    setCompleting(true)
    await completeTask(task.id)
    setCompleting(false)
  }

  async function handleReopen() {
    await reopenTask(task.id)
  }

  async function handleDelete() {
    if (!confirm('Delete this task?')) return
    setDeleting(true)
    await deleteTask(task.id)
    setDeleting(false)
  }

  return (
    <li
      className={`rounded-xl border bg-white transition-all ${
        variant === 'completed' ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      <div
        className="flex items-start gap-3 px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Complete toggle */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleComplete() }}
          disabled={completing || variant !== 'open'}
          className="mt-0.5 shrink-0 text-gray-300 hover:text-emerald-500 transition-colors disabled:cursor-default"
        >
          {variant === 'completed'
            ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            : completing
              ? <span className="h-5 w-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin block" />
              : <Circle className="h-5 w-5" />
          }
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-snug ${variant === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {/* Priority */}
            {variant === 'open' && task.priority !== 'medium' && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${priorityColour[task.priority]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority]}`} />
                {task.priority}
              </span>
            )}

            {/* Due date */}
            {dueDate && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${
                overdue ? 'text-red-500' : dueToday ? 'text-amber-600' : 'text-gray-400'
              }`}>
                <Calendar className="h-3 w-3" />
                {overdue ? 'Overdue · ' : dueToday ? 'Due today · ' : ''}
                {format(dueDate, 'd MMM')}
              </span>
            )}

            {/* Contact */}
            {task.contact && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400">
                <User className="h-3 w-3" />
                {task.contact.name}
              </span>
            )}

            {/* Delegated to */}
            {variant === 'delegated' && task.delegatedTo && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                <UserCheck className="h-3 w-3" />
                {task.delegatedTo}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {variant === 'open' && (
            <button
              onClick={onDelegate}
              className="p-1.5 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-all"
              title="Delegate"
            >
              <UserCheck className="h-4 w-4" />
            </button>
          )}
          {(variant === 'delegated' || variant === 'completed') && (
            <button
              onClick={handleReopen}
              className="p-1.5 rounded-lg text-gray-300 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
              title="Reopen"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expanded notes */}
      {expanded && task.description && (
        <div className="px-4 pb-3 pt-0 ml-8">
          <p className="text-sm text-gray-500 leading-relaxed">{task.description}</p>
        </div>
      )}
    </li>
  )
}
