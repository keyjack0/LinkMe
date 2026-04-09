'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { signIn, signInWithGoogle, signInWithGithub } from '@/lib/actions/auth.actions'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const authError = searchParams.get('auth_error')
    if (authError) {
      toast.error(decodeURIComponent(authError))
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    const result = await signInWithGoogle()
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  async function handleGithub() {
    setLoading(true)
    const result = await signInWithGithub()
    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-xl shadow-black/5">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink mb-1">Selamat datang kembali</h1>
        <p className="text-sm text-ink-muted">Masuk ke akun LinkMe kamu</p>
      </div>

      {/* Google Sign In */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-ink text-sm font-medium transition-all hover:border-ink-muted hover:shadow-sm disabled:opacity-50 mb-4"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Lanjutkan dengan Google
      </button>
      <button
        onClick={handleGithub}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)] bg-black text-white text-sm font-medium transition-all hover:bg-zinc-900 disabled:opacity-50 mb-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.304-.54-1.526.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3.005-.405c1.02.005 2.045.138 3.005.405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.65.24 2.872.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.825 1.11.825 2.235 0 1.61-.015 2.91-.015 3.305 0 .315.21.69.825.57C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z"/>
        </svg>
        Lanjutkan dengan GitHub
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center text-xs text-ink-muted bg-white px-3">atau dengan email</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
          <input name="email" type="email" required placeholder="kamu@email.com" className="input-base" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-ink">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-brand hover:underline">Lupa password?</Link>
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPass ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="input-base pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Masuk
        </button>
      </form>

      <p className="text-center text-sm text-ink-muted mt-6">
        Belum punya akun?{' '}
        <Link href="/auth/register" className="text-brand font-medium hover:underline">
          Daftar gratis
        </Link>
      </p>
    </div>
  )
}
