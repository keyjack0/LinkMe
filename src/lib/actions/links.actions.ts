'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { LinkFormData } from '@/types'

export async function createLink(data: LinkFormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const { data: lastLink } = await supabase
    .from('links')
    .select('sort_order')
    .eq('profile_id', user.id)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const { error } = await supabase.from('links').insert({
    profile_id: user.id,
    ...data,
    sort_order: lastLink ? lastLink.sort_order + 1 : 0,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/links')
  return { success: true }
}

export async function updateLink(id: string, data: Partial<LinkFormData>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('links')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/links')
  return { success: true }
}

export async function deleteLink(id: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/links')
  return { success: true }
}

export async function toggleLinkActive(id: string, is_active: boolean) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('links')
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/links')
  return { success: true }
}

export async function reorderLinks(orderedIds: string[]) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const updates = orderedIds.map((id, index) =>
    supabase
      .from('links')
      .update({ sort_order: index })
      .eq('id', id)
      .eq('profile_id', user.id)
  )

  await Promise.all(updates)

  revalidatePath('/dashboard/links')
  return { success: true }
}
