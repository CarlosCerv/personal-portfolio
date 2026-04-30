'use client'

import React, { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const supabase = useMemo(() => createClient(), [])
  const [email, setEmail] = useState('carlos.cervart@icloud.com')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setStatus('sending')

    if (!supabase) {
      setStatus('error')
      setError('Supabase no está configurado. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel.')
      return
    }

    const origin = window.location.origin
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/admin/auth/callback`,
      },
    })

    if (signInError) {
      setStatus('error')
      setError(signInError.message)
      return
    }

    setStatus('sent')
  }

  return (
    <main className="page-shell pt-12 pb-20">
      <div className="page-container">
        <div className="mx-auto max-w-xl">
          <div className="surface-panel p-8 md:p-10">
            <span className="eyebrow">Admin</span>
            <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
              Iniciar sesión
            </h1>
            <p className="mt-3 text-[15px] leading-[1.85] text-[#5c5d63]">
              Te enviaremos un enlace mágico a tu correo para acceder al panel.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label className="eyebrow block">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="admin-input mt-2 rounded-[14px] border border-black/[0.08] bg-[#fafafa]"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-base btn-primary w-full justify-center"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar enlace'}
              </button>

              {status === 'sent' ? (
                <div className="rounded-[16px] border border-black/[0.06] bg-white px-4 py-3 text-[14px] leading-relaxed text-[#5c5d63]">
                  Revisa tu correo. El enlace abre el panel automáticamente.
                </div>
              ) : null}

              {status === 'error' && error ? (
                <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] leading-relaxed text-[#111113]">
                  {error}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
