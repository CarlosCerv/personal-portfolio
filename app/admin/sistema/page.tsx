'use client'

import React, { useEffect, useState } from 'react'

type CheckRow = {
  key: string
  label: string
  ok: boolean
  detail: string
}

export default function AdminSistemaPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checks, setChecks] = useState<CheckRow[]>([])
  const [checkedAt, setCheckedAt] = useState<string | null>(null)

  async function runChecks() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/system', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) {
        setError(json?.error || 'No fue posible ejecutar la validación del sistema.')
        setChecks([])
        setCheckedAt(null)
        setLoading(false)
        return
      }

      setChecks(Array.isArray(json?.checks) ? json.checks : [])
      setCheckedAt(json?.checkedAt ?? null)
      setLoading(false)
    } catch {
      setError('No fue posible validar el sistema. Verifica tu conexión e intenta de nuevo.')
      setChecks([])
      setCheckedAt(null)
      setLoading(false)
    }
  }

  useEffect(() => {
    void runChecks()
  }, [])

  const okCount = checks.filter((item) => item.ok).length

  return (
    <div className="space-y-8">
      <header className="surface-panel p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Sistema</span>
            <h1 className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#111113] md:text-[42px]">
              Validación del panel admin
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-[1.85] text-[#5c5d63]">
              Comprueba tablas y mapeos críticos de Supabase para operar blog, perfil e intereses.
            </p>
          </div>
          <button type="button" onClick={() => void runChecks()} className="btn-base btn-primary px-6 py-2.5 text-[0.9rem]">
            Ejecutar validación
          </button>
        </div>
      </header>

      <section className="surface-panel p-7 md:p-8">
        {loading ? (
          <p className="text-[14px] text-[#5c5d63]">Validando…</p>
        ) : error ? (
          <div className="rounded-[16px] border border-red-500/20 bg-red-500/5 px-4 py-3 text-[14px] text-[#111113]">
            {error}
          </div>
        ) : (
          <>
            <div className="mb-5 rounded-[18px] border border-black/[0.06] bg-[#fafafa] px-4 py-3 text-[14px] text-[#111113]">
              Estado: <strong>{okCount}/{checks.length}</strong> checks OK
              {checkedAt ? ` · ${new Date(checkedAt).toLocaleString()}` : ''}
            </div>
            <div className="space-y-3">
              {checks.map((item) => (
                <div key={item.key} className="surface-card-soft rounded-[18px] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-[#111113]">{item.label}</p>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${item.ok ? 'border-green-500/20 bg-green-500/10 text-green-700' : 'border-red-500/20 bg-red-500/10 text-red-700'}`}>
                      {item.ok ? 'OK' : 'Error'}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#5c5d63]">{item.detail}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
