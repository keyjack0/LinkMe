'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo('.nav-logo',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      )

      gsap.fromTo('.nav-link',
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.5
        }
      )

      gsap.fromTo('.nav-btn',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.6
        }
      )
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/90 backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="nav-logo flex items-center gap-2  font-display text-xl font-extrabold text-ink tracking-tight">
          <Image src="/logoLM.png" alt="LinkMe Logo" width={30} height={30} />
          <span>LinkMe</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {[['#how', 'Cara Kerja'], ['#features', 'Fitur'], ['#showcase', 'Template'], ['#pricing', 'Harga']].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="nav-link text-sm text-ink-muted hover:text-ink transition-colors">{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="nav-btn text-sm font-medium text-ink-muted hover:text-ink transition-colors px-3 py-2 hidden sm:block">
            Masuk
          </Link>
          <Link href="/auth/register" className="nav-btn btn-primary text-sm px-5 py-2.5">
            Mulai Gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}
