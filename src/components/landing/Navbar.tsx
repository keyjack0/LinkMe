'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/90 backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold text-ink tracking-tight">
          Link<span className="text-brand">Me</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {[['#how', 'Cara Kerja'], ['#features', 'Fitur'], ['#showcase', 'Template'], ['#pricing', 'Harga']].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-sm text-ink-muted hover:text-ink transition-colors">{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors px-3 py-2 hidden sm:block">
            Masuk
          </Link>
          <Link href="/auth/register" className="btn-primary text-sm px-5 py-2.5">
            Mulai Gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}
