'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, UserPlus, X, User } from 'lucide-react'
import { createContactQuick } from '@/actions/tasks'

type Contact = { id: string; name: string; email: string | null; company: string | null }

interface Props {
  value: Contact | null
  onChange: (contact: Contact | null) => void
}

export function ContactPicker({ value, onChange }: Props) {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Search contacts on query change
  useEffect(() => {
    if (!open) return
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/contacts?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query, open])

  function handleOpen() {
    setOpen(true)
    setQuery('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  async function handleCreate() {
    if (!query.trim()) return
    setCreating(true)
    try {
      const result = await createContactQuick(query.trim())
      if (result.contact) {
        onChange(result.contact as Contact)
        setOpen(false)
      }
    } finally {
      setCreating(false)
    }
  }

  const exactMatch = results.some(
    (r) => r.name.toLowerCase() === query.trim().toLowerCase()
  )

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger / selected value */}
      {value ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold">
              {value.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{value.name}</p>
            {value.company && <p className="text-xs text-gray-500 truncate">{value.company}</p>}
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-gray-400 hover:text-red-400 transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
        >
          <User className="h-4 w-4 text-gray-400" />
          <span>Link a contact…</span>
        </button>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full min-w-[260px] rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (results.length === 1) {
                    onChange(results[0])
                    setOpen(false)
                  } else if (!exactMatch && query.trim()) {
                    handleCreate()
                  }
                }
                if (e.key === 'Escape') setOpen(false)
              }}
              placeholder="Search contacts…"
              className="flex-1 text-sm outline-none placeholder-gray-400"
            />
            {loading && (
              <span className="h-3 w-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shrink-0" />
            )}
          </div>

          {/* Results */}
          <ul className="max-h-52 overflow-y-auto">
            {results.map((contact) => (
              <li key={contact.id}>
                <button
                  type="button"
                  onClick={() => { onChange(contact); setOpen(false) }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 hover:bg-emerald-50 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-emerald-700 text-xs font-bold">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                    {(contact.email || contact.company) && (
                      <p className="text-xs text-gray-400 truncate">
                        {contact.company || contact.email}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            ))}

            {results.length === 0 && !query && (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                Start typing to search contacts
              </li>
            )}

            {results.length === 0 && query && (
              <li className="px-4 py-2 text-sm text-gray-400">No contacts found</li>
            )}
          </ul>

          {/* Create new contact option */}
          {query.trim() && !exactMatch && (
            <div className="border-t border-gray-100">
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
              >
                <UserPlus className="h-4 w-4 shrink-0" />
                {creating ? 'Adding…' : `Add "${query.trim()}" as new contact`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
