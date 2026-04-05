import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: { default: 'LinkMe — Semua Link dalam Satu Tempat', template: '%s | LinkMe' },
  description:
    'Buat halaman profil ringkas yang menampung berbagai tautan media sosial dan portofolio dalam satu link unik.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'LinkMe',
    title: 'LinkMe — Semua Link dalam Satu Tempat',
    description: 'Buat halaman profil ringkas dalam hitungan menit.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-cream font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              background: '#0A0A0A',
              color: '#F9F8F6',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
