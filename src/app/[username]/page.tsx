import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PublicProfile } from '@/components/PublicProfile'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio, avatar_url')
    .eq('username', username)
    .single()

  if (!profile) return { title: 'Profil tidak ditemukan' }

  return {
    title: `${profile.display_name ?? username} | LinkMe`,
    description: profile.bio ?? `Lihat semua link dari ${profile.display_name ?? username}`,
    openGraph: {
      title: profile.display_name ?? username,
      description: profile.bio ?? '',
      images: profile.avatar_url ? [{ url: profile.avatar_url }] : [],
    },
  }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  // Track view (fire & forget — tidak await agar tidak lambat)
  supabase.rpc('increment_profile_views', { profile_id: profile.id }).then()

  return <PublicProfile profile={profile} links={links ?? []} />
}
