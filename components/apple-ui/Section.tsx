'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient'
  id?: string
}

export function AppleSection({
  children,
  className,
  background = 'white',
  id,
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-background-alt',
    gradient: 'bg-gradient-to-b from-white to-background-alt',
  }

  return (
    <section
      id={id}
      className={cn(
        backgrounds[background],
        'py-16 md:py-24 lg:py-32',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  badge?: string
  title: React.ReactNode
  description?: string
  subtitle?: string
  centered?: boolean
}

export function AppleSectionHeader({
  badge,
  title,
  description,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16 lg:mb-20', centered && 'text-center max-w-2xl mx-auto')}>
      {badge && (
        <p className="inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
          {badge}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {subtitle && (
        <p className="text-sm md:text-base text-text-tertiary mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}
