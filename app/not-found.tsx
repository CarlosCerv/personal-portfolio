'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, ChevronLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    // Log 404 error to Supabase
    const logError = async () => {
      const supabase = createClient()
      if (!supabase) return
      const url = window.location.pathname
      const { data, error } = await supabase.rpc('increment_error_count', { error_url: url, etype: '404' })
      
      // If RPC is not setup yet, just do a normal upsert
      if (error) {
        await supabase.from('navigation_errors').upsert(
          { 
            url, 
            error_type: '404', 
            last_seen: new Date().toISOString(),
            user_agent: window.navigator.userAgent,
            referrer: document.referrer || 'direct'
          }, 
          { onConflict: 'url' }
        )
      }
    }
    
    logError()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <AlertCircle className="w-10 h-10 text-primary" />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight mb-4">404 — Page not found</h1>
      <p className="text-secondary-muted max-w-md mb-12">
        It seems the resource you're looking for doesn't exist or has been moved. Carlos has been notified of the error to fix it.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="admin-btn-primary py-3 px-8 text-base shadow-lg shadow-primary/20"
        >
          Go home
        </Link>
        <Link 
          href="/servicios" 
          className="admin-btn-outline py-3 px-8 text-base"
        >
          View services
        </Link>
      </div>

      <footer className="mt-20">
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold">
          &copy; {new Date().getFullYear()} Carlos Cervantes &middot; QA Consultant
        </p>
      </footer>
    </div>
  )
}
