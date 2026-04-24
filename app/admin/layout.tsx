import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin | Carlos Cervantes',
  robots: { index: false, follow: false },
}

function AdminTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
      <div className="page-container py-4">
        <div className="surface-panel flex items-center justify-between gap-4 rounded-[24px] p-3 md:p-4">
          <Link href="/admin" className="flex min-w-0 items-center gap-3" aria-label="Admin dashboard">
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-black/[0.08] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
              <span className="text-[13px] font-semibold tracking-[-0.03em] text-[#111113]">CC</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.98rem] font-semibold tracking-[-0.025em] text-[#111113]">Panel</p>
              <p className="truncate text-[0.78rem] leading-relaxed text-[#8a8b92]">Administration</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex">
            <Link href="/admin" className="rounded-full px-4 py-2.5 text-[0.88rem] font-medium text-[#5c5d63] hover:bg-white hover:text-[#111113]">
              Dashboard
            </Link>
            <Link href="/admin/blog" className="rounded-full px-4 py-2.5 text-[0.88rem] font-medium text-[#5c5d63] hover:bg-white hover:text-[#111113]">
              Blog
            </Link>
            <Link href="/admin/perfil" className="rounded-full px-4 py-2.5 text-[0.88rem] font-medium text-[#5c5d63] hover:bg-white hover:text-[#111113]">
              Profile
            </Link>
            <Link href="/admin/notificaciones" className="rounded-full px-4 py-2.5 text-[0.88rem] font-medium text-[#5c5d63] hover:bg-white hover:text-[#111113]">
              Notifications
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/" className="btn-base btn-secondary hidden md:inline-flex px-5 py-2.5 text-[0.88rem]">
              View site
            </Link>
            <Link href="/admin/logout" className="btn-base btn-primary px-5 py-2.5 text-[0.88rem]">
              Log out
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]">
      <AdminTopBar />
      <main className="page-container py-10 md:py-12">{children}</main>
      <footer className="page-container pb-10">
        <div className="rounded-[24px] border border-black/[0.06] bg-white/70 px-6 py-5 text-[0.85rem] text-[#5c5d63] shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>Administration panel · Carlos Cervantes</p>
            <p className="text-[#8a8b92]">Restricted access</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

