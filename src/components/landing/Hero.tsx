'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Gunakan GSAP hanya jika tersedia
    if (typeof window === 'undefined') return
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline()
        tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
          .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .fromTo('.hero-phone', { opacity: 0, x: 60, rotation: 3 }, { opacity: 1, x: 0, rotation: 0, duration: 1, ease: 'power3.out' }, '-=0.8')

        gsap.to('.hero-phone', { y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      })
    })
  }, [])

  return (
    <section className="min-h-screen pt-32 pb-20 px-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div>
        <div className="hero-label opacity-0 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand bg-brand/10 px-4 py-2 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />
          Profil Link Terbaik untuk Kreator
        </div>

        <h1 ref={headlineRef} className="opacity-0 font-display text-5xl lg:text-7xl font-extrabold leading-[1.0] tracking-tight text-ink mb-6">
          Semua <span className="text-brand">Link</span>-mu<br />
          dalam<br />
          <span className="text-stroke">Satu Tempat</span>
        </h1>

        <p className="hero-desc opacity-0 text-lg text-ink-muted font-light leading-relaxed mb-10 max-w-md">
          Buat halaman profil ringkas yang menampung semua tautan media sosial, portofolio, dan konten favoritmu dalam satu link unik.
        </p>

        <div className="hero-actions opacity-0 flex flex-wrap items-center gap-4">
          <Link href="/auth/register" className="btn-primary text-base px-8 py-4 rounded-full shadow-lg shadow-brand/25">
            Buat Link-mu Sekarang <ArrowRight size={18} />
          </Link>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <div className="flex -space-x-2">
              {['#6366F1','#EC4899','#F59E0B','#10B981'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-cream flex items-center justify-center text-white text-xs font-bold" style={{ background: c }}>
                  {['AR','BI','CD','DE'][i]}
                </div>
              ))}
            </div>
            +50.000 kreator bergabung
          </div>
        </div>
      </div>

      {/* Right - Phone Mockup */}
      <div className="hero-phone opacity-0 flex justify-center relative">
        <div className="absolute w-96 h-96 bg-brand/8 rounded-full blur-3xl -z-10" />
        <div className="w-64 bg-white rounded-[44px] p-5 shadow-2xl shadow-black/15 border border-black/5 relative z-10">
          <div className="w-20 h-7 bg-ink rounded-full mx-auto mb-5" />
          <div className="text-center mb-5">
            <div className="w-16 h-16 rounded-full gradient-blue flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-3">JD</div>
            <div className="font-display text-sm font-bold text-ink">Juna Diandra</div>
            <div className="text-xs text-ink-muted">@junadiandra</div>
            <div className="text-[10px] text-ink-muted mt-1">UI/UX Designer · Bandung 🇮🇩</div>
          </div>
          <div className="space-y-2">
            {[
              { icon: '🎨', label: 'Portfolio Desain', color: '#1B56FD' },
              { icon: '▶', label: 'YouTube Channel', color: '#0A0A0A' },
              { icon: '📸', label: 'Instagram', color: '#7C3AED' },
              { icon: '✍️', label: 'Blog Pribadi', color: '#EC4899' },
              { icon: '💼', label: 'Hire Me', color: '#059669' },
            ].map(({ icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-medium" style={{ background: color }}>
                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">{icon}</span>
                <span className="flex-1">{label}</span>
                <span className="opacity-60 text-[10px]">→</span>
              </div>
            ))}
          </div>
        </div>
        {/* Floating badges */}
        <div className="absolute top-8 right-0 bg-white rounded-2xl px-3 py-2 shadow-lg text-xs font-medium flex items-center gap-2 border border-[var(--border)]">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse-dot" />2,840 klik hari ini
        </div>
        <div className="absolute bottom-20 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg text-xs font-medium flex items-center gap-2 border border-[var(--border)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />Aktif sekarang
        </div>
      </div>
    </section>
  )
}
