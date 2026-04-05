'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Marquee ──────────────────────────────────────────────────
const PLATFORMS = ['Instagram','YouTube','TikTok','LinkedIn','Behance','GitHub','Shopee','Tokopedia','Substack','Spotify','Discord','WhatsApp']

export function Marquee() {
  const items = [...PLATFORMS, ...PLATFORMS]
  return (
    <div className="py-8 border-y border-[var(--border)] bg-white overflow-hidden">
      <div className="flex gap-14 animate-marquee w-max">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink-muted whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── HowItWorks ───────────────────────────────────────────────
const STEPS = [
  { num: '01', title: 'Daftar & Pilih Username', desc: 'Buat akun gratis dan pilih username unik untuk URL profil-mu. Seperti linkme.id/namamu — mudah diingat.' },
  { num: '02', title: 'Tambah Link & Kustomisasi', desc: 'Tambahkan semua link-mu: media sosial, website, toko online, portofolio. Pilih tema sesuai kepribadianmu.' },
  { num: '03', title: 'Bagikan & Pantau', desc: 'Bagikan satu link ke bio Instagram, Twitter, atau di mana pun. Pantau berapa banyak klik dari dasbor.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-28 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">Cara Kerja</div>
        <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4">Tiga langkah,<br />siap dipakai</h2>
        <p className="text-lg text-ink-muted font-light max-w-md mb-14">Dari mendaftar hingga membagikan profil-mu, semua selesai dalam 5 menit.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(s => (
            <div key={s.num} className="relative p-10 rounded-3xl border border-[var(--border)] bg-cream hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-5 right-6 font-display text-7xl font-extrabold text-black/5 leading-none select-none">{s.num}</div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6"></div>
              <h3 className="font-display text-lg font-bold text-ink mb-3">{s.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────
const FEATURES = [
  { title: 'Analitik Real-Time', desc: 'Lihat jumlah kunjungan, klik per link, dan lokasi pengunjung secara langsung.' },
  { title: 'Tema & Kustomisasi', desc: 'Puluhan tema siap pakai atau buat tampilan unikmu sendiri dengan editor visual.' },
  { title: 'Link Tanpa Batas', desc: 'Tambahkan berapa pun link yang kamu mau — media sosial, toko, blog, semua bisa.' },
  { title: 'Loading Super Cepat', desc: 'Halaman profil dioptimasi untuk kecepatan — buka dalam hitungan milidetik.' },
  { title: 'Mobile-First Design', desc: 'Tampil sempurna di semua perangkat — smartphone, tablet, maupun desktop.' },
]

const FEATURE_CONTENTS = [
  // 0: Analytics
  <div key="analytics" className="analytics-card">
    <div className="ac-stat">12,840</div>
    <div className="ac-label">Total klik bulan ini</div>
    <div className="ac-chart">
      <div className="ac-bar" style={{ height: '30%' }}></div>
      <div className="ac-bar" style={{ height: '50%' }}></div>
      <div className="ac-bar" style={{ height: '40%' }}></div>
      <div className="ac-bar" style={{ height: '70%' }}></div>
      <div className="ac-bar" style={{ height: '55%' }}></div>
      <div className="ac-bar" style={{ height: '85%' }}></div>
      <div className="ac-bar" style={{ height: '65%' }}></div>
      <div className="ac-bar ac-bar-active" style={{ height: '100%' }}></div>
    </div>
  </div>,
  // 1: Themes
  <div key="themes" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
    <div style={{ fontSize: '13px', color: 'rgba(249,248,246,0.5)', marginBottom: '12px' }}>Pilih Tema</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
      {['#0F172A', '#FFF7ED', '#F0FDF4', '#FDF4FF', '#EEF3FF', '#1A1A2E', '#FFF0F3', '#F5F5DC'].map((c, i) => (
        <div key={i} style={{ height: '44px', background: c, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}></div>
      ))}
    </div>
  </div>,
  // 2: Links
  <div key="links" className="mini-links" style={{ fontSize: '13px', color: 'rgba(249,248,246,0.4)', marginBottom: '20px' }}>
    {['Portfolio Desain', 'YouTube Channel', 'Instagram', 'Blog Pribadi', 'Hire Me', 'Toko Online', 'Spotify', 'Email'].map((l, i) => (
      <div key={i} className="ml-item" style={{ cursor: 'pointer' }}>
        <span>{l}</span>
        <div className="ml-progress" style={{ fontSize: '11px', color: 'rgba(249,248,246,0.3)' }}>
          {['1,240', '983', '756', '534', '421', '380', '290', '185'][i]} klik
        </div>
      </div>
    ))}
  </div>,
  // 3: Speed
  <div key="speed" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '48px', fontWeight: '800', color: '#4ADE80' }}>
      98<span style={{ fontSize: '24px' }}>ms</span>
    </div>
    <div style={{ fontSize: '13px', color: 'rgba(249,248,246,0.4)', marginBottom: '20px' }}>Waktu loading rata-rata</div>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--cream)' }}>100</div>
        <div style={{ fontSize: '11px', color: 'rgba(249,248,246,0.35)' }}>Performance</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--cream)' }}>100</div>
        <div style={{ fontSize: '11px', color: 'rgba(249,248,246,0.35)' }}>SEO</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--cream)' }}>100</div>
        <div style={{ fontSize: '11px', color: 'rgba(249,248,246,0.35)' }}>Accessibility</div>
      </div>
    </div>
  </div>,
  // 4: Mobile
  <div key="mobile" style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'flex-end', padding: '20px 0' }}>
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '20px', width: '160px' }}>
      <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</div>
      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cream)', marginBottom: '4px' }}>Mobile</div>
      <div style={{ fontSize: '11px', color: 'rgba(249,248,246,0.35)' }}>72% traffic</div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '10px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '72%', background: 'var(--blue)', borderRadius: '2px' }}></div>
      </div>
    </div>
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '20px', width: '160px' }}>
      <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💻</div>
      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--cream)', marginBottom: '4px' }}>Desktop</div>
      <div style={{ fontSize: '11px', color: 'rgba(249,248,246,0.35)' }}>28% traffic</div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '10px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '28%', background: '#EC4899', borderRadius: '2px' }}></div>
      </div>
    </div>
  </div>
]

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const featuresRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        const items = featuresRef.current?.querySelectorAll('.feature-item')
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: featuresRef.current,
                start: 'top 85%',
              },
            }
          )
        }
      })
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    import('gsap').then(({ gsap }) => {
      const content = mockupRef.current?.querySelector('.feature-content')
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
      }
    })
  }, [activeFeature])

  return (
    <section id="features" className="py-28 px-8 bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">Fitur Unggulan</div>
        <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-cream mb-4">Didesain untuk<br />kreator modern</h2>
        <p className="text-lg text-cream/40 font-light max-w-md mb-14">Semua alat yang kamu butuhkan untuk membangun kehadiran online yang kuat.</p>
        <div ref={featuresRef} className="features-grid">
          <div className="features-list">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-item ${activeFeature === i ? 'active' : ''}`}
                onClick={() => setActiveFeature(i)}
              >
                <div>
                  <div className="fi-title">{f.title}</div>
                  <div className="fi-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div ref={mockupRef} className="features-mockup">
            <div className="fm-header">
              <div className="fm-dot fm-red"></div>
              <div className="fm-dot fm-yellow"></div>
              <div className="fm-dot fm-green"></div>
              <div className="fm-url">linkme.id/junadiandra</div>
            </div>
            <div className="feature-content">{FEATURE_CONTENTS[activeFeature]}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Templates ────────────────────────────────────────────────
const TEMPLATES = [
  { name: 'Midnight Pro', desc: 'Elegan, gelap, profesional', badge: 'Popular', bg: 'bg-gradient-to-br from-slate-900 to-blue-900', textLight: true, accent: '#3B82F6' },
  { name: 'Warm Sunset', desc: 'Hangat, personal, kreatif', badge: 'Baru', bg: 'bg-gradient-to-br from-orange-50 to-yellow-300', textLight: false, accent: '#EF4444' },
  { name: 'Fresh Green', desc: 'Segar, natural, bersih', badge: '', bg: 'bg-gradient-to-br from-green-50 to-green-400', textLight: false, accent: '#059669' },
  { name: 'Dreamy Purple', desc: 'Artistik, feminin, estetik', badge: 'Favorit', bg: 'bg-gradient-to-br from-fuchsia-50 to-purple-400', textLight: false, accent: '#7C3AED' },
]

export function Templates() {
  return (
    <section id="showcase" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-14 gap-4 flex-wrap">
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">Template</div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">Pilih temamu,<br />tampil beda</h2>
          </div>
          <p className="text-base text-ink-muted max-w-xs">Puluhan template dirancang oleh desainer profesional untuk berbagai kebutuhan.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TEMPLATES.map(t => (
            <div key={t.name} className="rounded-2xl overflow-hidden border border-[var(--border)] bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className={`${t.bg} h-52 flex flex-col items-center justify-center p-5`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-lg mb-2" style={{ background: t.accent }}>
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div className={`text-xs font-bold ${t.textLight ? 'text-white/90' : 'text-ink/80'}`}>{t.name}</div>
                <div className="mt-3 w-full space-y-1.5">
                  <div className="h-5 rounded-md opacity-50" style={{ background: t.accent }} />
                  <div className="h-5 rounded-md opacity-30 w-4/5" style={{ background: t.accent }} />
                </div>
              </div>
              <div className="p-4">
                <div className="font-display text-sm font-bold text-ink">{t.name}</div>
                <div className="text-xs text-ink-muted mt-0.5">{t.desc}</div>
                {t.badge && <span className="inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-brand/10 text-brand">{t.badge}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  { text: 'Semenjak pakai LinkMe, engagement di Instagram naik karena pengunjung bisa menemukan semua konten saya. Tampilannya juga keren banget!', name: 'Aldi Ramadhan', role: 'Content Creator · 280K Followers', initials: 'AR', color: '#1B56FD' },
  { text: 'Sebagai freelance designer, LinkMe bantu saya showcase portfolio dan connect ke semua platform. Client jadi lebih gampang menemukan saya.', name: 'Risa Susanti', role: 'UI/UX Designer · Freelancer', initials: 'RS', color: '#EC4899' },
  { text: 'Fitur analitiknya super helpful! Sekarang saya tahu link mana yang paling banyak diklik. Sangat rekomendasikan untuk bisnis online.', name: 'Dewi Kartika', role: 'Owner · @belanjadewi', initials: 'DK', color: '#7C3AED' },
  { text: 'Setup-nya mudah banget, nggak perlu skill teknis sama sekali. Dalam 10 menit sudah punya halaman profil yang terlihat profesional.', name: 'Budi Pratama', role: 'Musisi · Songwriter', initials: 'BP', color: '#059669' },
  { text: 'Template-nya beragam dan bisa dikustomisasi sesuai brand. Saya suka hasilnya — terlihat eksklusif dan konsisten dengan feed Instagram saya.', name: 'Lina Handayani', role: 'Fashion Blogger · 95K Followers', initials: 'LH', color: '#F59E0B' },
  { text: 'Pindah dari tools lain ke LinkMe dan tidak nyesel! Lebih cepat, lebih bagus tampilannya, dan harganya juga lebih terjangkau.', name: 'Fajar Nugraha', role: 'Digital Marketer', initials: 'FN', color: '#EF4444' },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">Testimoni</div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4">Dipercaya ribuan<br />kreator Indonesia</h2>
          <p className="text-base text-ink-muted max-w-md mx-auto">Dari content creator, freelancer, hingga pemilik UMKM — semua sudah merasakan manfaatnya.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="p-7 rounded-2xl bg-cream border border-[var(--border)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex gap-0.5 mb-4">{Array(5).fill(null).map((_,i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
              <p className="text-sm text-ink leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <div className="text-sm font-semibold text-ink font-display">{t.name}</div>
                  <div className="text-xs text-ink-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────
const PLANS = [
  { name: 'Free', price: 'Rp0', period: 'Selamanya gratis', featured: false, features: ['Hingga 10 link','5 pilihan tema','Analitik dasar','Subdomain linkme.id'] },
  { name: 'Pro', price: 'Rp29k', period: 'per bulan', featured: true, badge: 'Paling Populer', features: ['Link tanpa batas','Semua tema premium','Analitik lengkap','Custom domain','Hapus branding','Prioritas support'] },
  { name: 'Business', price: 'Rp79k', period: 'per bulan', featured: false, features: ['Semua fitur Pro','Multiple profil','Team collaboration','API access','White-label option'] },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">Harga</div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4">Mulai gratis,<br />berkembang bersama</h2>
          <p className="text-base text-ink-muted max-w-md mx-auto">Tanpa biaya tersembunyi. Upgrade kapanpun kamu siap.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {PLANS.map(p => (
            <div
              key={p.name}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                p.featured ? 'bg-brand border-brand scale-105 shadow-xl shadow-brand/25' : 'bg-white border-[var(--border)]'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink text-cream text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">{p.badge}</div>
              )}
              <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${p.featured ? 'text-white/60' : 'text-ink-muted'}`}>{p.name}</div>
              <div className={`font-display text-4xl font-extrabold tracking-tight mb-1 ${p.featured ? 'text-white' : 'text-ink'}`}>{p.price}</div>
              <div className={`text-sm mb-6 ${p.featured ? 'text-white/60' : 'text-ink-muted'}`}>{p.period}</div>
              <ul className="space-y-2.5 mb-7">
                {p.features.map(f => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${p.featured ? 'text-white/80' : 'text-ink-muted'}`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${p.featured ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/auth/register"
                className={`block text-center py-3 rounded-full text-sm font-semibold transition-all ${
                  p.featured ? 'bg-white text-brand hover:bg-white/90' : 'border border-[var(--border)] text-ink hover:border-ink-muted'
                }`}
              >
                {p.name === 'Business' ? 'Hubungi Kami' : 'Mulai Sekarang'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────
const FAQS = [
  { q: 'Apakah LinkMe benar-benar gratis?', a: 'Ya! Plan Free LinkMe gratis selamanya. Kamu bisa membuat profil dengan hingga 10 link, 5 tema, dan analitik dasar tanpa kartu kredit.' },
  { q: 'Bisakah saya menggunakan domain sendiri?', a: 'Ya! Dengan plan Pro dan Business, kamu bisa menghubungkan domain kustom milikmu sehingga profil bisa diakses melalui nama.com.' },
  { q: 'Berapa banyak link yang bisa saya tambahkan?', a: 'Plan Free mendukung hingga 10 link. Plan Pro dan Business mendukung link tanpa batas.' },
  { q: 'Apakah ada kontrak atau komitmen jangka panjang?', a: 'Tidak sama sekali. Semua plan berbayar bersifat bulanan dan bisa dibatalkan kapan saja tanpa penalti.' },
  { q: 'Bagaimana cara kerja analitik LinkMe?', a: 'LinkMe melacak setiap kunjungan dan klik secara real-time. Kamu bisa melihat total kunjungan, klik per link, asal negara, dan perangkat pengunjung.' },
]

export function FAQ() {
  return (
    <section id="faq" className="py-28 px-8 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">FAQ</div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-10">Pertanyaan<br />yang sering ditanya</h2>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <details key={i} className="group border-b border-[var(--border)] py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none gap-4">
                  <span className="font-display text-base font-bold text-ink">{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-cream flex items-center justify-center text-sm flex-shrink-0 group-open:bg-brand group-open:text-white transition-all group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-ink-muted leading-relaxed pt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="bg-cream rounded-3xl p-10 flex flex-col items-center justify-center gap-8">
          {[{ num: '50K+', label: 'Pengguna aktif di Indonesia' }, { num: '2.4M', label: 'Link diklik setiap bulan' }, { num: '99.9%', label: 'Uptime yang terjamin' }].map((s, i) => (
            <div key={i} className={`text-center w-full ${i < 2 ? 'border-b border-[var(--border)] pb-8' : ''}`}>
              <div className="font-display text-5xl font-extrabold text-brand tracking-tight">{s.num}</div>
              <div className="text-sm text-ink-muted mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────
export function CTA() {
  return (
    <section id="cta" className="py-24 px-8 bg-brand relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
      <div className="max-w-2xl mx-auto text-center relative">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">Siap memulai?</div>
        <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
          Buat profil link-mu<br />sekarang juga
        </h2>
        <p className="text-lg text-white/60 mb-10">Gratis selamanya. Tidak perlu kartu kredit. Setup dalam 2 menit.</p>
        <div className="flex bg-white rounded-full p-1.5 max-w-sm mx-auto shadow-2xl">
          <span className="flex items-center pl-4 text-sm text-ink-muted whitespace-nowrap">linkme.id/</span>
          <input type="text" placeholder="username-mu" className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-light px-1 min-w-0" />
          <a href="/auth/register" className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors whitespace-nowrap">
            Klaim →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
export function Footer() {
  const cols = [
    { title: 'Produk', links: ['Fitur','Template','Harga','Changelog','Roadmap'] },
    { title: 'Perusahaan', links: ['Tentang Kami','Blog','Karir','Press','Kontak'] },
    { title: 'Dukungan', links: ['Pusat Bantuan','Status','Kebijakan Privasi','Syarat & Ketentuan','API Docs'] },
  ]
  return (
    <footer className="bg-ink pt-16 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/8">
          <div>
            <div className="font-display text-xl font-extrabold text-cream mb-3">Link<span className="text-brand">Me</span></div>
            <p className="text-sm text-cream/35 leading-relaxed mb-5 max-w-52">Aplikasi web untuk membuat halaman profil ringkas dengan berbagai tautan dalam satu link unik.</p>
            <div className="flex gap-2">
              {['𝕏','in','ig','▶'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-xs text-cream/60 hover:bg-white/10 transition-colors">{s}</a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div className="text-xs font-bold uppercase tracking-widest text-cream mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-cream/35 hover:text-cream transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cream/20">
          <span>© {new Date().getFullYear()} LinkMe. Dibuat dengan ❤ di Indonesia.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
