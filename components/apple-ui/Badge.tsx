'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function AppleBadge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-background-alt text-text-primary border border-border-primary',
    success: 'bg-accent-green/10 text-accent-green',
    error: 'bg-accent-red/10 text-accent-red',
    warning: 'bg-accent-orange/10 text-accent-orange',
    info: 'bg-primary/10 text-primary',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs font-semibold',
    md: 'px-3 py-1.5 text-sm font-semibold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        'tracking-wide uppercase',
        className
      )}
    >
      {children}
    </span>
  )
}
