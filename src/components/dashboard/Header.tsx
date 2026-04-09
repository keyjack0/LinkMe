'use client'

import { Bell } from 'lucide-react'
import type { Profile } from '@/types'
import { getInitials } from '@/lib/utils'

interface Props {
  userEmail: string   // ← string, bukan User object
  profile: Profile | null
}

export function DashboardHeader({ userEmail, profile }: Props) {
  return (
    <header className="h-16 bg-white border-b border-[var(--border)] px-8 flex items-center justify-between flex-shrink-0">
      <div className="text-sm text-ink-muted">
        {new Date().toLocaleDateString('id-ID', {
          weekday: 'long', day: 'numeric',
          month: 'long', year: 'numeric'
        })}
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-ink-muted hover:text-ink transition-all">
          <Bell size={16} />
        </button>
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full gradient-blue flex items-center justify-center text-white text-xs font-bold">
            {getInitials(profile?.display_name ?? userEmail)}
          </div>
        )}
      </div>
    </header>
  )
}