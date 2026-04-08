import { Sidebar } from '@/components/admin/sidebar'
import { Topbar } from '@/components/admin/topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(0,113,227,0.06),transparent_28%),linear-gradient(180deg,#fbfbfd_0%,#f5f5f7_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1560px] gap-4 px-3 pb-6 pt-4 md:gap-5 md:px-5 md:pb-8 md:pt-5 xl:px-6">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 px-1 pb-2 pt-4 md:px-0 md:pt-5">
            <div className="mx-auto max-w-7xl space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
