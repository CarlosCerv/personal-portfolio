import { Sidebar } from '@/components/admin/sidebar'
import { Topbar } from '@/components/admin/topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-radial-gradient(circle at top right, rgba(0, 113, 227, 0.08), transparent 50%)" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 px-3 pb-6 pt-4 md:gap-6 md:px-5 md:pb-8 md:pt-5 xl:px-6">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-64">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 px-1 pb-2 pt-4 md:px-0 md:pt-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

