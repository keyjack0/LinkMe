'use client'

import { useState, useTransition } from 'react'
import { Loader2, Camera, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { updateProfile, uploadAvatar } from '@/lib/actions/profile.actions'
import { signOut } from '@/lib/actions/auth.actions'
import { getInitials } from '@/lib/utils'
import type { Profile } from '@/types'

export function SettingsClient({ profile, userEmail }: { profile: Profile | null; userEmail: string }) {
  const [username, setUsername] = useState(profile?.username ?? '')
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '')
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateProfile({ username, display_name: displayName, bio, theme_id: profile?.theme_id ?? '' })
      if (result.error) { toast.error(result.error); return }
      setSaved(true)
      toast.success('Profil berhasil disimpan!')
      setTimeout(() => setSaved(false), 3000)
    })
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file)
    const result = await uploadAvatar(formData)
    if (result.error) { toast.error(result.error); return }
    if (result.url) setAvatarUrl(result.url)
    toast.success('Foto profil diperbarui!')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Avatar */}
      <div className="card">
        <h2 className="font-display text-base font-bold text-ink mb-4">Foto Profil</h2>
        <div className="flex items-center gap-5">
          <div className="relative group">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-20 h-20 rounded-2xl object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-2xl gradient-blue flex items-center justify-center text-white text-2xl font-bold font-display">
                {getInitials(displayName || username)}
              </div>
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera size={20} className="text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Unggah foto profil</p>
            <p className="text-xs text-ink-muted mt-1">JPG, PNG atau GIF. Maks 2MB.</p>
            <label className="btn-secondary mt-2 text-xs px-3 py-1.5 cursor-pointer inline-flex items-center gap-2">
              <Camera size={13} /> Pilih Foto
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <form onSubmit={handleSave}>
        <div className="card space-y-4">
          <h2 className="font-display text-base font-bold text-ink">Informasi Profil</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted">linkme.id/</span>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase())}
                  className="input-base pl-[80px] text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Nama Tampilan</label>
              <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="input-base text-sm" placeholder="Nama Lengkap" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              maxLength={160}
              placeholder="Ceritakan sedikit tentang dirimu..."
              className="input-base resize-none text-sm"
            />
            <p className="text-xs text-ink-muted mt-1">{bio.length}/160 karakter</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input value={userEmail} disabled className="input-base text-sm opacity-60 cursor-not-allowed" />
            <p className="text-xs text-ink-muted mt-1">Email tidak bisa diubah melalui halaman ini</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isPending} className="btn-primary px-6 py-2.5 text-sm">
              {isPending ? <Loader2 size={15} className="animate-spin" /> : saved ? <CheckCircle size={15} /> : null}
              {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <h2 className="font-display text-base font-bold text-red-600 mb-3">Zona Berbahaya</h2>
        <p className="text-sm text-ink-muted mb-4">Tindakan berikut tidak dapat dibatalkan. Harap berhati-hati.</p>
        <form action={signOut}>
          <button type="submit" className="text-sm px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium">
            Keluar dari Semua Perangkat
          </button>
        </form>
      </div>
    </div>
  )
}
