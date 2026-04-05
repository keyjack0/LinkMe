import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// GET /api/analytics?range=7d|30d|90d
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const range = searchParams.get('range') ?? '30d'

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30
  const since = new Date(Date.now() - days * 86_400_000).toISOString()

  // Views harian
  const { data: views } = await supabase
    .from('profile_views')
    .select('viewed_at, country, device')
    .eq('profile_id', user.id)
    .gte('viewed_at', since)
    .order('viewed_at', { ascending: true })

  // Klik per link
  const { data: clicks } = await supabase
    .from('link_clicks')
    .select('link_id, clicked_at, country, device, links(title)')
    .eq('profile_id', user.id)
    .gte('clicked_at', since)
    .order('clicked_at', { ascending: true })

  // Summary totals
  const { data: summary } = await supabase
    .from('analytics_summary')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  // Agregasi views per hari
  const viewsByDay: Record<string, number> = {}
  views?.forEach((v) => {
    const day = v.viewed_at.split('T')[0]
    viewsByDay[day] = (viewsByDay[day] ?? 0) + 1
  })

  // Agregasi klik per link
  const clicksByLink: Record<string, { title: string; clicks: number }> = {}
  clicks?.forEach((c) => {
    const linkTitle = (c.links as { title: string } | null)?.title ?? 'Unknown'
    if (!clicksByLink[c.link_id]) {
      clicksByLink[c.link_id] = { title: linkTitle, clicks: 0 }
    }
    clicksByLink[c.link_id].clicks++
  })

  // Top countries
  const countryCounts: Record<string, number> = {}
  views?.forEach((v) => {
    if (v.country) countryCounts[v.country] = (countryCounts[v.country] ?? 0) + 1
  })

  // Device breakdown
  const deviceCounts = { mobile: 0, tablet: 0, desktop: 0 }
  views?.forEach((v) => {
    if (v.device && v.device in deviceCounts) {
      deviceCounts[v.device as keyof typeof deviceCounts]++
    }
  })

  return NextResponse.json({
    summary,
    viewsByDay,
    clicksByLink: Object.values(clicksByLink).sort((a, b) => b.clicks - a.clicks),
    topCountries: Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count })),
    deviceBreakdown: deviceCounts,
  })
}
