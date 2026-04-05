'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { isValidUsername } from '@/lib/utils'
import type { ProfileFormData } from '@/types'

export async function updateProfile(data: ProfileFormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  if (data.username && !isValidUsername(data.username)) {
    return { error: 'Username tidak valid (3-30 karakter, huruf kecil/angka/. /_)' }
  }

  // Cek username conflict
  if (data.username) {
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', data.username)
      .neq('id', user.id)
      .single()

    if (existing) return { error: 'Username sudah digunakan' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/settings')
  revalidatePath(`/[username]`, 'page')
  return { success: true }
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized' }

  const file = formData.get('avatar') as File
  if (!file) return { error: 'File tidak ditemukan' }

  const fileExt = file.name.split('.').pop()
  const filePath = `avatars/${user.id}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('linkme-uploads')
    .upload(filePath, file, { upsert: true })

  if (uploadError) return { error: uploadError.message }

  const { data: { publicUrl } } = supabase.storage
    .from('linkme-uploads')
    .getPublicUrl(filePath)

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id)

  if (updateError) return { error: updateError.message }

  revalidatePath('/dashboard')
  return { success: true, url: publicUrl }
}
