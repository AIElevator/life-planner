'use client'

import { useState } from 'react'
import { delegateTask } from '@/actions/tasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, UserCheck } from 'lucide-react'

const QUICK_DELEGATES = ['Andrew']

interface Props {
  taskId: string
  taskTitle: string
  onClose: () => void
}

export function DelegateModal({ taskId, taskTitle, onClose }: Props) {
  const [name, setName]       = useState('')
  const [pending, setPending] = useState(false)

  async function handleDelegate(delegateTo: string) {
    if (!delegateTo.trim()) return
    setPending(true)
    await delegateTask(taskId, delegateTo)
    setPending(false)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Delegate task</h3>
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{taskTitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick-pick buttons */}
        {QUICK_DELEGATES.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Quick assign</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_DELEGATES.map((person) => (
                <button
                  key={person}
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelegate(person)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  {person}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Manual entry */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Or type a name</p>
          <div className="flex gap-2">
            <Input
              placeholder="Delegate to…"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDelegate(name)
                if (e.key === 'Escape') onClose()
              }}
              autoFocus={QUICK_DELEGATES.length === 0}
            />
            <Button
              onClick={() => handleDelegate(name)}
              disabled={!name.trim() || pending}
              size="sm"
            >
              {pending ? '…' : 'Assign'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
