import { createClient } from '@/lib/supabase/server'
import { formatNumber } from '@/lib/utils'
import { BarChart2, Link2, Eye, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: links } = await supabase.from('links').select('*').eq('profile_id', user.id).order('total_clicks', { ascending: false }).limit(5)
  const { data: summary } = await supabase.from('analytics_summary').select('*').eq('profile_id', user.id).single()

  const stats = [
    { label: 'Total Kunjungan', value: formatNumber(summary?.total_views ?? 0), icon: Eye, color: 'text-brand', bg: 'bg-brand/10' },
    { label: 'Total Klik', value: formatNumber(summary?.total_clicks ?? 0), icon: BarChart2, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Kunjungan Hari Ini', value: formatNumber(summary?.views_today ?? 0), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Link', value: links?.length?.toString() ?? '0', icon: Link2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Halo, {profile?.display_name ?? profile?.username} 👋
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Profil kamu:{' '}
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${profile?.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline inline-flex items-center gap-1"
            >
              linkme.id/{profile?.username} <ExternalLink size={12} />
            </a>
          </p>
        </div>
        <Link href="/dashboard/links" className="btn-primary text-sm">
          + Tambah Link
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="font-display text-2xl font-bold text-ink">{stat.value}</div>
            <div className="text-xs text-ink-muted mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top Links */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-ink">Link Terpopuler</h2>
          <Link href="/dashboard/links" className="text-sm text-brand hover:underline inline-flex items-center gap-1">
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>
        {links && links.length > 0 ? (
          <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm flex-shrink-0"
                  style={{ background: link.color ?? '#1B56FD' }}
                >
                  {link.icon ?? '🔗'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{link.title}</div>
                  <div className="text-xs text-ink-muted truncate">{link.url}</div>
                </div>
                <div className="text-sm font-semibold text-ink flex-shrink-0">
                  {formatNumber(link.total_clicks)} klik
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-ink-muted text-sm">Belum ada link. Yuk tambahkan!</p>
            <Link href="/dashboard/links" className="btn-primary mt-3 text-sm">+ Tambah Link Pertama</Link>
          </div>
        )}
      </div>

      {/* Profile completion */}
      {!profile?.bio && (
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-ink">Lengkapi profil kamu</div>
            <div className="text-xs text-ink-muted mt-0.5">Tambahkan bio dan foto untuk meningkatkan kepercayaan pengunjung</div>
          </div>
          <Link href="/dashboard/settings" className="btn-primary text-sm whitespace-nowrap">Lengkapi Sekarang</Link>
        </div>
      )}
    </div>
  )
}
