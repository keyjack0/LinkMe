import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from '@/components/dashboard/SettingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pengaturan' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Pengaturan Profil</h1>
        <p className="text-sm text-ink-muted mt-1">Kelola informasi profil publik dan preferensi akun.</p>
      </div>
      <SettingsClient profile={profile} userEmail={user.email ?? ''} />
    </div>
  )
}
