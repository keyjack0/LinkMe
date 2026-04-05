'use client'

import { useState, useEffect } from 'react'
import { Eye, MousePointerClick, TrendingUp, Globe, Smartphone, Monitor, Loader2 } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import type { AnalyticsSummary } from '@/types'

const RANGES = [
  { label: '7 Hari', value: '7d' },
  { label: '30 Hari', value: '30d' },
  { label: '90 Hari', value: '90d' },
]

interface AnalyticsData {
  summary: AnalyticsSummary | null
  viewsByDay: Record<string, number>
  clicksByLink: { title: string; clicks: number }[]
  topCountries: { country: string; count: number }[]
  deviceBreakdown: { mobile: number; tablet: number; desktop: number }
}

export function AnalyticsClient({
  profileId,
  initialSummary,
}: {
  profileId: string
  initialSummary: AnalyticsSummary | null
}) {
  const [range, setRange] = useState('30d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/analytics?range=${range}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [range])

  const summary = data?.summary ?? initialSummary
  const totalDevices = data
    ? (data.deviceBreakdown.mobile + data.deviceBreakdown.tablet + data.deviceBreakdown.desktop) || 1
    : 1

  const statCards = [
    { label: 'Total Kunjungan', value: formatNumber(summary?.total_views ?? 0), sub: `+${formatNumber(summary?.views_today ?? 0)} hari ini`, icon: Eye, color: 'text-brand', bg: 'bg-brand/10' },
    { label: 'Total Klik', value: formatNumber(summary?.total_clicks ?? 0), sub: `+${formatNumber(summary?.clicks_today ?? 0)} hari ini`, icon: MousePointerClick, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Kunjungan Minggu Ini', value: formatNumber(summary?.views_this_week ?? 0), sub: 'vs 7 hari lalu', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Klik Minggu Ini', value: formatNumber(summary?.clicks_this_week ?? 0), sub: 'vs 7 hari lalu', icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  // Build chart bars from viewsByDay
  const dayEntries = Object.entries(data?.viewsByDay ?? {}).slice(-14)
  const maxViews = Math.max(...dayEntries.map(([, v]) => v), 1)

  return (
    <div className="space-y-6">
      {/* Range Selector */}
      <div className="flex gap-2">
        {RANGES.map(r => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              range === r.value
                ? 'bg-brand text-white shadow-sm'
                : 'bg-white border border-[var(--border)] text-ink-muted hover:text-ink'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="card">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div className="font-display text-2xl font-bold text-ink">{s.value}</div>
            <div className="text-xs text-ink-muted mt-0.5">{s.label}</div>
            <div className="text-xs text-emerald-600 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-brand" />
        </div>
      )}

      {!loading && data && (
        <>
          {/* Views Chart */}
          <div className="card">
            <h3 className="font-display text-base font-bold text-ink mb-5">Kunjungan per Hari</h3>
            <div className="flex items-end gap-1.5 h-40">
              {dayEntries.length > 0 ? dayEntries.map(([day, count]) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-xs text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {count}
                  </div>
                  <div
                    className="w-full bg-brand/20 rounded-t-md group-hover:bg-brand transition-colors"
                    style={{ height: `${Math.max((count / maxViews) * 100, 4)}%` }}
                  />
                  <div className="text-[9px] text-ink-muted">
                    {new Date(day).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              )) : (
                <p className="text-sm text-ink-muted text-center w-full self-center">Belum ada data</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top Links */}
            <div className="card lg:col-span-2">
              <h3 className="font-display text-base font-bold text-ink mb-4">Link Terpopuler</h3>
              {data.clicksByLink.length > 0 ? (
                <div className="space-y-3">
                  {data.clicksByLink.slice(0, 6).map((item, i) => {
                    const maxClicks = data.clicksByLink[0]?.clicks ?? 1
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 text-xs text-ink-muted font-medium">{i + 1}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-ink truncate">{item.title}</span>
                            <span className="text-xs font-semibold text-ink ml-2">{formatNumber(item.clicks)}</span>
                          </div>
                          <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand rounded-full transition-all duration-700"
                              style={{ width: `${(item.clicks / maxClicks) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-ink-muted">Belum ada klik</p>
              )}
            </div>

            {/* Device + Countries */}
            <div className="space-y-4">
              {/* Device */}
              <div className="card">
                <h3 className="font-display text-sm font-bold text-ink mb-3">Perangkat</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Mobile', key: 'mobile', icon: Smartphone, color: 'bg-brand' },
                    { label: 'Desktop', key: 'desktop', icon: Monitor, color: 'bg-violet-500' },
                  ].map(d => {
                    const count = data.deviceBreakdown[d.key as 'mobile' | 'desktop']
                    const pct = Math.round((count / totalDevices) * 100)
                    return (
                      <div key={d.key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-ink-muted flex items-center gap-1"><d.icon size={12} />{d.label}</span>
                          <span className="font-medium text-ink">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                          <div className={`h-full ${d.color} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Countries */}
              <div className="card">
                <h3 className="font-display text-sm font-bold text-ink mb-3">Negara Teratas</h3>
                {data.topCountries.length > 0 ? (
                  <div className="space-y-2">
                    {data.topCountries.map(c => (
                      <div key={c.country} className="flex justify-between text-sm">
                        <span className="text-ink-muted">{c.country || 'Unknown'}</span>
                        <span className="font-medium text-ink">{formatNumber(c.count)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ink-muted">Belum ada data</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
