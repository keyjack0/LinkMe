# LinkMe — Biolink Clone

Aplikasi web untuk membuat halaman profil ringkas yang menampung berbagai tautan media sosial dan portofolio dalam satu link unik.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animation**: GSAP + ScrollTrigger
- **Backend**: Next.js API Routes + Server Actions
- **Database**: Supabase (PostgreSQL + RLS)
- **Auth**: Supabase Auth (Email + Google OAuth)
- **Storage**: Supabase Storage (avatar upload)
- **DnD**: @dnd-kit (drag & drop link reorder)

## Struktur Project

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── [username]/page.tsx         # Halaman profil publik
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx                # Beranda dashboard
│   │   ├── links/page.tsx          # Kelola link
│   │   ├── analytics/page.tsx      # Analitik
│   │   ├── settings/page.tsx       # Pengaturan profil
│   │   └── themes/page.tsx         # Pilih tema
│   └── api/
│       ├── auth/callback/route.ts  # OAuth callback
│       ├── links/route.ts          # CRUD links
│       ├── links/[id]/route.ts     # Single link
│       ├── profiles/route.ts       # Profile API
│       └── analytics/
│           ├── route.ts            # Get analytics
│           └── click/route.ts      # Track click
├── components/
│   ├── landing/                    # Semua komponen landing page
│   ├── dashboard/                  # Komponen dashboard
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── LinkManager.tsx         # DnD link manager
│   │   ├── AnalyticsClient.tsx
│   │   └── SettingsClient.tsx
│   └── PublicProfile.tsx           # Halaman profil publik
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client
│   │   └── server.ts               # Server + Admin client
│   ├── actions/
│   │   ├── auth.actions.ts         # Server Actions: auth
│   │   ├── links.actions.ts        # Server Actions: links
│   │   └── profile.actions.ts      # Server Actions: profile
│   └── utils.ts
├── hooks/
│   ├── useUser.ts
│   ├── useLinks.ts
│   └── useProfile.ts
├── types/
│   ├── database.types.ts           # Auto-generated Supabase types
│   └── index.ts
└── middleware.ts                   # Auth guard
```

## Setup

### 1. Clone & Install

```bash
git clone <repo-url> linkme
cd linkme
npm install
```

### 2. Buat Project Supabase

1. Buka [supabase.com](https://supabase.com) → **New Project**
2. Catat **Project URL** dan **Anon Key** dari *Settings > API*
3. Catat **Service Role Key** (jaga kerahasiaan!)

### 3. Konfigurasi Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Jalankan Migrasi Database

Di **Supabase Dashboard → SQL Editor**, jalankan isi file:
```
supabase/migrations/001_initial_schema.sql
```

### 5. Setup Google OAuth (Opsional)

1. Buka [console.cloud.google.com](https://console.cloud.google.com)
2. Buat OAuth 2.0 Client ID
3. Authorized redirect URI: `https://xxxx.supabase.co/auth/v1/callback`
4. Di Supabase: *Authentication > Providers > Google* → masukkan Client ID & Secret

### 6. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Perintah Berguna

```bash
# Dev server
npm run dev

# Build production
npm run build

# Generate TypeScript types dari Supabase
npm run db:types
# (Perlu Supabase CLI + project ID dikonfigurasi)
```

## Deployment ke Vercel

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import project
3. Tambahkan semua environment variables
4. Deploy!

Di Supabase, tambahkan URL produksi ke:
- *Authentication > URL Configuration > Site URL*
- *Authentication > URL Configuration > Redirect URLs*

## Fitur yang Bisa Dikembangkan

- [ ] Dashboard tema visual editor
- [ ] QR Code generator untuk profil
- [ ] Scheduled links (aktif pada waktu tertentu)
- [ ] A/B testing untuk judul link
- [ ] Embed musik/video di profil
- [ ] Webhook notifikasi klik
- [ ] Export analytics ke CSV
- [ ] Team management untuk Business plan
