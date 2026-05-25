'use client'

import { useState } from 'react'
import { createDiaryShare } from '@/actions/diary'
import { Share2, Copy, Check, Loader2, ExternalLink } from 'lucide-react'
import { format, startOfWeek } from 'date-fns'

export function ShareDiaryButton({ weekDate }: { weekDate: Date }) {
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const weekStart = startOfWeek(weekDate, { weekStartsOn: 1 })
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const shareUrl = token ? `${baseUrl}/diary/${token}` : null

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await createDiaryShare(weekStart, `Week of ${format(weekStart, 'd MMM yyyy')}`)
      setToken(result.token)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (shareUrl) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 flex-1 min-w-0">
          <ExternalLink className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span className="text-xs text-emerald-700 truncate font-mono">{shareUrl}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-all shrink-0"
        >
          {copied ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy link</>}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
      ) : (
        <Share2 className="h-4 w-4 text-gray-400" />
      )}
      Share with ManvFat
    </button>
  )
}
