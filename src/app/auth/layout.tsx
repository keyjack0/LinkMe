import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Auth',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header kecil */}
      <header className="py-6 px-8">
        <Link href="/" className="font-display text-xl font-extrabold text-ink tracking-tight">
          Link<span className="text-brand">Me</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="py-6 text-center text-sm text-ink-muted">
        © {new Date().getFullYear()} LinkMe · Dibuat dengan ❤ di Indonesia
      </footer>
    </div>
  )
}
