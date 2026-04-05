import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// GET /api/links — ambil semua link milik user yang login
export async function GET() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', user.id)
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST /api/links — buat link baru
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { title, url, icon, color, is_active } = body

  if (!title || !url) {
    return NextResponse.json({ error: 'title dan url wajib diisi' }, { status: 400 })
  }

  // Ambil sort_order terbesar lalu tambah 1
  const { data: lastLink } = await supabase
    .from('links')
    .select('sort_order')
    .eq('profile_id', user.id)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const nextOrder = lastLink ? lastLink.sort_order + 1 : 0

  const { data, error } = await supabase
    .from('links')
    .insert({
      profile_id: user.id,
      title,
      url,
      icon: icon ?? null,
      color: color ?? '#1B56FD',
      is_active: is_active ?? true,
      sort_order: nextOrder,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// PATCH /api/links — reorder (drag & drop)
export async function PATCH(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { orderedIds } = body as { orderedIds: string[] }

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json({ error: 'orderedIds harus array' }, { status: 400 })
  }

  // Update sort_order secara batch
  const updates = orderedIds.map((id, index) =>
    supabase
      .from('links')
      .update({ sort_order: index })
      .eq('id', id)
      .eq('profile_id', user.id)
  )

  await Promise.all(updates)

  return NextResponse.json({ success: true })
}
