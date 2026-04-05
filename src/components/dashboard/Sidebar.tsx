'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Link2, BarChart2, Palette, Settings, ExternalLink, LogOut } from 'lucide-react'
import { signOut } from '@/lib/actions/auth.actions'
import type { Profile } from '@/types'
import { cn, getInitials } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Beranda', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/links', label: 'Link', icon: Link2 },
  { href: '/dashboard/analytics', label: 'Analitik', icon: BarChart2 },
  { href: '/dashboard/themes', label: 'Tema', icon: Palette },
  { href: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
]

export function DashboardSidebar({ profile }: { profile: Profile | null }) {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-[var(--border)] flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/" className="font-display text-xl font-extrabold text-ink tracking-tight">
          Link<span className="text-brand">Me</span>
        </Link>
      </div>

      {/* Profile mini */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream transition-colors">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full gradient-blue flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {getInitials(profile?.display_name ?? profile?.username ?? 'U')}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-ink truncate">
              {profile?.display_name ?? profile?.username}
            </div>
            <div className="text-xs text-ink-muted truncate">@{profile?.username}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-brand text-white shadow-sm shadow-brand/30'
                  : 'text-ink-muted hover:text-ink hover:bg-cream'
              )}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-[var(--border)] space-y-1">
        {profile?.username && (
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-cream transition-all"
          >
            <ExternalLink size={17} />
            Lihat Profil
          </a>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={17} />
            Keluar
          </button>
        </form>
      </div>
    </aside>
  )
}
