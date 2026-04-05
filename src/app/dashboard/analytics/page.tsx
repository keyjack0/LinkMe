import { createClient } from '@/lib/supabase/server'
import { AnalyticsClient } from '@/components/dashboard/AnalyticsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analitik' }

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: summary } = await supabase
    .from('analytics_summary')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Analitik</h1>
        <p className="text-sm text-ink-muted mt-1">Pantau performa profil dan link-mu secara real-time.</p>
      </div>
      <AnalyticsClient profileId={user.id} initialSummary={summary} />
    </div>
  )
}
