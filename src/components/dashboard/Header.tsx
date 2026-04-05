'use client'

import { Bell } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types'
import { getInitials } from '@/lib/utils'

interface Props {
  user: User
  profile: Profile | null
}

export function DashboardHeader({ user, profile }: Props) {
  return (
    <header className="h-16 bg-white border-b border-[var(--border)] px-8 flex items-center justify-between flex-shrink-0">
      <div className="text-sm text-ink-muted">
        {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-ink-muted hover:text-ink hover:border-ink-muted transition-all relative">
          <Bell size={16} />
        </button>
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full gradient-blue flex items-center justify-center text-white text-xs font-bold">
            {getInitials(profile?.display_name ?? user.email ?? 'U')}
          </div>
        )}
      </div>
    </header>
  )
}
