import { createClient } from '@/lib/supabase/server'
import { LinkManager } from '@/components/dashboard/LinkManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kelola Link' }

export default async function LinksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', user.id)
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Kelola Link</h1>
        <p className="text-sm text-ink-muted mt-1">Tambah, edit, dan atur urutan link-mu dengan drag & drop.</p>
      </div>
      <LinkManager initialLinks={links ?? []} profileId={user.id} />
    </div>
  )
}
