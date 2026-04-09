import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  // Handle error dari Supabase
  if (error) {
    const errorMessage = errorDescription
      ? `auth_error=${encodeURIComponent(errorDescription)}`
      : 'auth_error=Terjadi kesalahan saat login'
    return NextResponse.redirect(`${requestUrl.origin}/auth/login?${errorMessage}`)
  }

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      // Handle otp_expired atau invalid code
      const errorMessage = exchangeError.message.includes('expired')
        ? 'auth_error=Link sudah kadaluarsa, silakan minta link baru'
        : 'auth_error=Link tidak valid, silakan minta link baru'
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?${errorMessage}`)
    }

    return NextResponse.redirect(`${requestUrl.origin}${next}`)
  }

  // Tidak ada code atau error, redirect ke login
  return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
}
