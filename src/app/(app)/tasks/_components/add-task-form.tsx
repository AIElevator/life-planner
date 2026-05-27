'use client'

import { useState, useRef } from 'react'
import { createTask } from '@/actions/tasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ContactPicker } from './contact-picker'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'

type Contact = { id: string; name: string; email: string | null; company: string | null }

export function AddTaskForm() {
  const [open, setOpen]           = useState(false)
  const [contact, setContact]     = useState<Contact | null>(null)
  const [pending, setPending]     = useState(false)
  const [showMore, setShowMore]   = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    const fd = new FormData(e.currentTarget)
    if (contact) fd.set('contactId', contact.id)
    await createTask(fd)
    formRef.current?.reset()
    setContact(null)
    setShowMore(false)
    setOpen(false)
    setPending(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-3 text-sm font-medium text-gray-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/40 transition-all"
      >
        <Plus className="h-4 w-4" />
        Add a task…
      </button>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-xl border border-emerald-200 bg-white p-4 space-y-3 shadow-sm"
    >
      {/* Title */}
      <Input
        name="title"
        placeholder="What needs doing?"
        autoFocus
        required
        className="font-medium"
      />

      {/* Contact picker */}
      <div className="space-y-1">
        <Label className="text-xs text-gray-500">Contact (optional)</Label>
        <ContactPicker value={contact} onChange={setContact} />
      </div>

      {/* Toggle more fields */}
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showMore ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {showMore ? 'Fewer options' : 'More options'}
      </button>

      {showMore && (
        <div className="space-y-3 pt-1 border-t border-gray-100">
          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs text-gray-500">Notes</Label>
            <textarea
              id="description"
              name="description"
              rows={2}
              placeholder="Any extra details…"
              className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Due date */}
            <div className="space-y-1">
              <Label htmlFor="dueDate" className="text-xs text-gray-500">Due date</Label>
              <Input id="dueDate" name="dueDate" type="date" />
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <Label htmlFor="priority" className="text-xs text-gray-500">Priority</Label>
              <select
                id="priority"
                name="priority"
                defaultValue="medium"
                className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? 'Saving…' : 'Add task'}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => { setOpen(false); setContact(null) }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
