'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogIn, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('carlos.cervart@icloud.com')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const supabase = createClient()
    if (!supabase) {
      setError('Supabase no está configurado en este entorno.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Revisa tu correo — el enlace expira en 10 minutos.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-alt p-4">
      <div className="admin-card max-w-sm w-full p-8 space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Inicia sesión con Magic Link para gestionar tu portafolio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted px-1">
              Email autorizado
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3 bg-background-alt border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full admin-btn-primary flex items-center justify-center gap-2 py-3"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Enviar Magic Link'
            )}
          </button>
        </form>

        {message && (
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700 text-center animate-in fade-in slide-in-from-bottom-1">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700 text-center animate-in fade-in slide-in-from-bottom-1">
            {error}
          </div>
        )}

        <div className="text-center pt-4">
          <a href="/" className="text-xs text-muted hover:text-primary transition-colors">
            ← Volver al sitio público
          </a>
        </div>
      </div>
    </div>
  )
}
