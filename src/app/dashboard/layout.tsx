import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/Header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-cream flex">
      <DashboardSidebar profile={profile} />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <DashboardHeader
          userEmail={user.email ?? ''}
          profile={profile}
        />
        <main className="flex-1 p-8 max-w-5xl w-full">
          {children}
        </main>
      </div>
    </div>
  )
}