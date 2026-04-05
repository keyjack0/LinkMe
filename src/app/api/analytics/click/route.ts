import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDeviceType, hashIp } from '@/lib/utils'

// POST /api/analytics/click — track klik link (public, no auth)
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const body = await request.json()
  const { link_id, profile_id } = body

  if (!link_id || !profile_id) {
    return NextResponse.json({ error: 'link_id dan profile_id wajib' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const userAgent = request.headers.get('user-agent') ?? ''
  const referrer = request.headers.get('referer') ?? null
  const country = request.headers.get('x-vercel-ip-country') ?? null // Vercel inject ini otomatis

  const { error } = await supabase.from('link_clicks').insert({
    link_id,
    profile_id,
    ip_hash: hashIp(ip),
    user_agent: userAgent,
    country,
    device: getDeviceType(userAgent),
    referrer,
  })

  if (error) {
    console.error('Error tracking click:', error)
  }

  // Increment counter di tabel links
  await supabase.rpc('increment_link_clicks', { link_id })

  return NextResponse.json({ success: true })
}
