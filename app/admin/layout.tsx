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

      <div className="relative flex min-h-screen w-full flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="flex-shrink-0 lg:w-72">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 md:px-6 md:py-6">
            <div className="mx-auto w-full max-w-7xl space-y-6 pb-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

