'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Link } from '@/types'

export function useLinks(profileId?: string) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchLinks = useCallback(async () => {
    if (!profileId) return
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileId)
      .order('sort_order', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setLinks(data ?? [])
    }
    setLoading(false)
  }, [profileId])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  // Realtime subscription
  useEffect(() => {
    if (!profileId) return

    const channel = supabase
      .channel(`links:${profileId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'links', filter: `profile_id=eq.${profileId}` },
        () => fetchLinks()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [profileId, fetchLinks])

  return { links, loading, error, refetch: fetchLinks }
}
