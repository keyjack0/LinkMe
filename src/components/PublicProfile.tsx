'use client'

import { getInitials } from '@/lib/utils'
import type { Profile, Link } from '@/types'

async function trackClick(linkId: string, profileId: string) {
  await fetch('/api/analytics/click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link_id: linkId, profile_id: profileId }),
  })
}

export function PublicProfile({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6 text-center">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name ?? profile.username}
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full gradient-blue flex items-center justify-center text-white text-3xl font-bold font-display mb-4 shadow-lg">
              {getInitials(profile.display_name ?? profile.username)}
            </div>
          )}

          <h1 className="font-display text-xl font-bold text-ink">
            {profile.display_name ?? profile.username}
          </h1>
          <p className="text-sm text-ink-muted mt-1">@{profile.username}</p>

          {profile.bio && (
            <p className="text-sm text-ink-muted mt-3 max-w-xs leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(link.id, profile.id)}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white font-medium text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] select-none"
              style={{
                background: link.color ?? '#1B56FD',
                boxShadow: `0 4px 14px ${link.color ?? '#1B56FD'}40`,
              }}
            >
              {link.icon && (
                <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-base flex-shrink-0">
                  {link.icon}
                </span>
              )}
              <span className="flex-1">{link.title}</span>
              <span className="opacity-60">→</span>
            </a>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center py-8 text-ink-muted text-sm">
            Belum ada link yang ditambahkan.
          </div>
        )}

        {/* Branding */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="text-xs text-ink-muted hover:text-ink transition-colors"
          >
            Buat halaman kamu di <span className="font-semibold text-brand">LinkMe</span>
          </a>
        </div>
      </div>
    </div>
  )
}
