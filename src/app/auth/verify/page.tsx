'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'kamu@email.com'

  return (
    <div className="card shadow-xl shadow-black/5 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-brand" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink mb-2">Cek Email Kamu</h1>
        <p className="text-ink-muted">
          Kami sudah mengirim link konfirmasi ke<br />
          <span className="font-medium text-ink">{email}</span>
        </p>
      </div>

      <div className="bg-ink-muted/5 rounded-xl p-4 mb-6">
        <p className="text-sm text-ink-muted">
          Klik link di email untuk mengaktifkan akun kamu.
          Link akan kadaluarsa dalam 5 menit.
        </p>
      </div>

      <div className="space-y-3">
        <Link href="/auth/login" className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2">
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
        <p className="text-xs text-ink-muted">
          Sudah klik link tapi masih belum bisa login?{' '}
          <Link href="/auth/login" className="text-brand hover:underline">
            Coba kirim ulang link
          </Link>
        </p>
      </div>
    </div>
  )
}
